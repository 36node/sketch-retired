import { get, toString, toUpper, mergeWith } from "lodash";
import {
  Collection,
  ItemGroup,
  Item,
  Request,
  HeaderList,
  RequestBody,
  Url,
  Response,
  RequestAuth,
} from "postman-collection";
import jsonfile from "jsonfile";
import path from "path";
import fs from "fs";

import { build, formatPath, parse } from "../lib";

class PostmanGenerator {
  _variable = {};

  constructor(swagger, templatePath) {
    this.swagger = swagger;
    this.templatePath = templatePath;
  }

  /**
   * Gen postman collection headers
   * @param {object} operation swaggen operation node
   */
  genHeaders(operation) {
    const headerList = new HeaderList();
    headerList.append({
      key: "Accept",
      value: "application/json",
    });

    if (operation.requestBody) {
      headerList.append({
        key: "Content-Type",
        value: "application/json",
      });
    }

    return headerList;
  }

  /**
   * Genreate postman collection url object
   * @param {object} operation swagger operation object
   */
  genUrl(operation) {
    const operationPath = get(operation, "path", "/");
    const url = new Url();
    url.host = `{{baseUrl}}`;
    url.path = [formatPath(operationPath)];
    return url;
  }

  /**
   * Generate postman request object
   * @param {*} operation swagger operation
   */
  genRequest(operation) {
    const request = new Request();
    request.headers = this.genHeaders(operation);
    request.url = this.genUrl(operation);
    request.method = toUpper(operation.method);

    // security config, preferred to use operation security config
    const security =
      get(operation, ["security"], null) ||
      get(this.swagger, ["security"], null);

    if (security && Array.isArray(security)) {
      for (let s of security) {
        const applySecurity = Object.keys(s)[0];
        const securitySchema = get(
          this.swagger,
          ["components", "securitySchemes", applySecurity],
          null
        );

        // TODO: support multi-type security schema
        if (
          securitySchema &&
          securitySchema.type === "http" &&
          securitySchema.scheme === "bearer"
        ) {
          request.auth = new RequestAuth({
            type: "bearer",
            bearer: [
              {
                key: "token",
                value: "{{token}}",
                type: "string",
              },
            ],
          });
        }
      }
    }

    // generate request body
    const body = get(operation, ["requestBody", "content", "properties"], null);

    if (body) {
      const raw = {};
      for (let k in body) {
        raw[k] = `{{${k}}}`;
        this._variable[k] = { key: k };
      }

      request.body = new RequestBody({
        mode: "raw",
        raw: JSON.stringify(raw, null, 2),
      });
    }

    if (operation.parameters) {
      for (let param of operation.parameters) {
        if (param.in === "query") {
          request.url.addQueryParams({
            key: param.name,
            value: toString(param.default),
          });
        }

        if (param.in === "path") {
          request.url.variables.add({
            id: param.name,
            value: `{{${param.name}}}`,
            type: get(param, "schema.type", "string"),
          });
        }

        if (param.in === "header") {
          request.headers.add({
            key: param.name,
            value: toString(param.default),
          });
        }
      }
    }
    return request;
  }

  /**
   * Generate postman response object
   * @param {*} operation swager operation definitions
   */
  genResponse(operation) {
    const { response } = operation;
    if (!response) {
      return undefined;
    }

    const { description, headers, content, status } = response;

    const resp = new Response();
    resp.name = `Response_${status}`;
    resp.originalRequest = this.genRequest(operation);
    resp.code = Number(status);
    resp.status = description || "OK";
    const headerList = new HeaderList();
    if (content) {
      headerList.append({
        key: "Content-type",
        value: "application/json",
      });
    }

    if (headers) {
      for (let k of Object.keys(headers)) {
        headerList.append({ key: k, value: "unset" });
      }
    }
    resp.headers = headerList;

    const examples = get(content, "examples");

    // only default example
    if (examples && examples.default) {
      resp.body = get(examples, ["default", "value"]);
    }
    return resp;
  }

  /**
   * Generate postman item, one reqeust one item
   * @param {*} operation swagger operation definition
   */
  genItem(operation) {
    const name = operation.summary || operation.name || operation.operationId;
    const request = this.genRequest(operation);
    const item = new Item();
    item.request = request;
    item.name = name;
    item.description = name;
    item.responses.append(this.genResponse(operation));

    const tplTest = path.join(this.templatePath, "postman", "test-script.hbs");
    const testContent = build(tplTest, operation);

    // console.log(testContent);

    // init test script
    item.events.add({
      listen: "test",
      script: {
        type: "text/javascript",
        exec: testContent.split("\n"),
      },
    });
    return item;
  }
  /**
   * Gernate postman collection folder
   * @param api swagger api definition
   */
  genFolder(api) {
    const folder = new ItemGroup({ name: api.name });
    const { operations = [] } = api;

    for (let operation of operations) {
      folder.items.add(this.genItem(operation));
    }

    return folder;
  }

  genCollection(name) {
    const { api = {}, components = {} } = this.swagger;
    const collection = new Collection({
      name,
    });

    for (let n in api) {
      collection.items.add(this.genFolder(api[n], components));
    }
    collection.variable = Object.values(this._variable);
    return collection;
  }
}

export default function genPostman({ yamlFile, targetFile, templatePath }) {
  parse(yamlFile, { dereference: true }).then(function(swagger) {
    const generator = new PostmanGenerator(swagger, templatePath);
    const name = get(swagger, ["info", "title"], null);
    if (!name) throw new Error("Openapi must have title");
    const collection = generator.genCollection(name).toJSON();
    const finalTargetFile = targetFile || name + ".postman_collection.json";

    // if file exist merge generated collection to original collection
    if (fs.existsSync(finalTargetFile)) {
      const originCollection = jsonfile.readFileSync(finalTargetFile);
      mergeWith(collection, originCollection, (objValue, srcValue, key) => {
        // test script not merge
        if (key === "exec") {
          return srcValue;
        }
        return undefined;
      });
    }
    jsonfile.writeFileSync(finalTargetFile, collection, { spaces: 2 });
  });
}
