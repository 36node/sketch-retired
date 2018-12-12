import path from "path";
import "../helpers";
import parse from "../parse";
import fs from "fs";
import { mkdir } from "./lib";
let {
  camelCase,
  capitalize,
  toPairs,
  mapValues,
  padStart,
  chain,
  at,
} = require("lodash");
let map = {};
function generateId(capName, old = false) {
  let all = capName.slice(0, 3);
  map[capName] = map[capName] || 0;
  if (!old) {
    map[capName]++;
  }
  return all + "thisistestid36node" + padStart(map[capName] || 1, 3, 0);
}

function genDataFromType(name, property, capName) {
  let { type, format, enum: enum1, $ref } = property;
  let salt = parseInt(Math.random() * 1000).toString()[1];
  if ($ref) {
    let refName = $ref.split("/").pop();
    return generateId(refName, 1);
  }
  if (name == "id") {
    return generateId(capName);
  }
  if (enum1) {
    return enum1[parseInt(enum1.length * Math.random())];
  }
  if (format == "date-time") {
    return new Date();
  } else if (type == "integer") {
    return salt;
  } else if (type == "boolean") {
    return true;
  }
  let map = {
    email: "hidlov" + salt + "@foxmail.com",
    phone: "1861234123" + salt,
  };
  return map[name] || name + "12" + salt;
}
function genJson(name, schemas, count) {
  name = camelCase(name);
  let capName = capitalize(name);

  let schema = schemas[capName];
  const mapVFunc = (property, fieldName) =>
    genDataFromType(fieldName, property, capName);
  const mapVkey = ({ $ref }, fieldName) => fieldName + ($ref ? "Id" : "");
  return new Array(count).fill(0).map(() =>
    chain(schema.properties)
      .mapKeys(mapVkey)
      .mapValues(mapVFunc)
      .value()
  );
}
function prepareData(api, schemas) {
  let needExpand = {};
  let pluMap = {};
  for (let name in api) {
    let obj = api[name];
    for (let item of obj.operations) {
      let successResponse = item.response;
      let { content } = successResponse;
      let schema = content ? content.schema : null;
      let pluralName = item.path.split("/")[1];
      pluMap[name] = pluralName;
      if (schema && schema.$ref) {
        let resultSchema = schemas[schema.$ref.split("/").pop()];
        let refs = toPairs(resultSchema.properties).filter(
          ([name, { $ref }]) => $ref
        );
        if (refs && refs.length) {
          needExpand[item.path.replace(/\{(\w+)\}/g, ":$1")] = [
            ...new Set(refs.map(item => item[0])),
          ];
        }
      }
    }
  }
  return [needExpand, pluMap];
}
/**
 * Generate code for json-server api
 * @param {object} opts options
 * @param {string} opts.dist code dist
 * @param {string} opts.yamlFile openapi file path
 * @param {string} opts.count count of mock data
 */
export default function genMock({ dist, yamlFile, count = 10 }) {
  parse(yamlFile)
    .then(function(swagger) {
      let {
        components: { schemas },
        servers,
        api,
      } = swagger;
      let defaultUrl = at(servers, "[0].variables.basePath.default")[0] || "";

      if (dist) {
        mkdir(dist);
      }
      const finalDist = dist || process.cwd();

      let [needExpand, pluMap] = prepareData(api, schemas);

      let jsonObj = chain(api)
        .mapValues((v, key) => genJson(key, schemas, count))
        .mapKeys((v, key) => pluMap[key])
        .value();
      let routesObj = {
        [defaultUrl + "/*"]: "/$1",
        ...mapValues(
          needExpand,
          (arr, path) => path + "?_expand=" + arr.join()
        ),
        ...chain(needExpand)
          .mapKeys((arr, path) => path + "?*")
          .mapValues(
            (arr, path) =>
              path.slice(0, path.length - 1) + "$1&_expand=" + arr.join()
          )
          .value(),
      };

      fs.writeFileSync(
        path.join(finalDist, `routes.json`),
        JSON.stringify(routesObj)
      );
      fs.writeFileSync(
        path.join(finalDist, `db.json`),
        JSON.stringify(jsonObj)
      );
    })
    .catch(err => console.error(err));
}
