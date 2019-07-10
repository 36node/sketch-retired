import Handlebars from "handlebars";
import hbsHelper from "handlebars-helpers";
import { upperFirst, get } from "lodash";
import { normalize } from "@36node/query-normalizr";

hbsHelper({
  handlebars: Handlebars,
});

/**
 * Get schema type
 *
 * @param {*} schema swagger schema object
 * @returns {String} parsed type
 */
export function getSchemaType(schema = {}) {
  let { type, $ref, items, properties = {}, oneOf } = schema;

  if (oneOf) {
    return oneOf.map(i => getSchemaType(i)).join("|");
  }

  if (schema.enum) {
    if (type === "string") {
      return schema.enum.map(e => `"${e}"`).join("|");
    } else {
      return schema.enum.join("|");
    }
  }

  if (type === "integer") return "number";
  if (type === "float") return "number";
  if (type === "array") {
    return `[${getSchemaType(items)}]`;
  }

  if (type === "object") {
    const ret = [];
    for (let key in properties) {
      ret.push(`${key}:${getSchemaType(properties[key])}`);
    }
    return `{
        ${ret.join("\n")}
      }`;
  }

  if ($ref) {
    const segs = $ref.split("/");
    if (segs.length < 2) {
      throw new Error(`ref pattern is wrong: ${$ref}`);
    }
    return upperFirst(segs[segs.length - 1]);
  }

  return type;
}

/**
 * Determine whether the type parameter is included
 *
 * @param {Array} parameters the params
 * @param {string} type parameter type
 * @returns {boolean} return true if type in parameters
 */
export function hasParamType(parameters = [], type) {
  for (let p of parameters) {
    if (p.in === type) return true;
  }
  return false;
}

/**
 * Determin whether the response json body is included
 * @param {*} operation swagger operation object
 */
export function hasJsonBody(operation) {
  const schema = get(operation, ["response", "content", "schema"], null);
  if (schema) {
    return true;
  }

  return false;
}

/**
 * Get json body from response of operation definition
 * @param {*} operation swagger operation object
 * @returns {object} return json response body schema
 */
export function getJsonBodySchema(operation) {
  const bodySchema = get(operation, ["response", "content", "schema"], null);
  if (bodySchema) {
    return JSON.stringify(bodySchema, null, 2);
  }
  return null;
}

/**
 * Determine whether the request has status
 * @param {*} operation swagger operation object
 */
export function hasResponseStatus(operation) {
  const status = get(operation, ["response", "status"], null);
  if (status) {
    return true;
  }

  return false;
}

/**
 * Determine whether the type parameter is required
 *
 * @param {Array} parameters the params
 * @param {string} type parameter type
 * @returns {boolean} return true if {type} in parameters
 */
export function requireParamType(parameters = [], type) {
  for (let p of parameters) {
    if (p.in === type && p.required) return true;
  }
  return false;
}

export function normalizeQuery(parameters = []) {
  const queryParams = parameters.filter(p => p.in === "query");

  // 将query params 转换成可以被 normalize 转换的数据格式
  const mockQuery = {};
  for (let p of queryParams) {
    mockQuery[p.name] = p.name;
  }

  const normalized = normalize(mockQuery);

  const { filter = {}, ...rest } = normalized;

  const isRegExp = o => {
    return (
      typeof o !== "undefined" &&
      Object.prototype.toString.call(o) === "[object RegExp]"
    );
  };

  const getParam = name => {
    if (!isRegExp(name)) {
      return queryParams.find(p => p.name === name);
    } else {
      // 如果是正则表达式 _like, 则特殊处理
      return queryParams.find(p => p.name === name.source);
    }
  };

  const params = Object.keys(rest).map(k => {
    const param = getParam(rest[k]);
    return {
      ...param,
      name: k,
    };
  });

  const filters = Object.keys(filter).map(k => {
    const param = getParam(k);

    const likeParm = getParam(`${k}_like`);

    // xx_like && xx all in openapi file
    if (likeParm && param) {
      return {
        name: k,
        schema: {
          oneOf: [
            {
              type: "object",
              properties: {
                $regex: {
                  type: "string",
                },
              },
            },
            param.schema,
          ],
        },
      };
    }

    if (param) return param;
    else {
      const f = filter[k];
      const opers = Object.keys(f).map(o => {
        return {
          ...getParam(f[o]),
          name: o,
        };
      });

      return {
        name: k,
        operators: opers,
      };
    }
  });

  const tpl = `
  query:{
    {{#each params}}
    {{name}}{{#unless required}}?{{/unless}}: {{{schemaType schema}}};
    {{/each}}

    {{#if filters}}
    filter:{
      {{#each filters}}
        {{#if (not operators)}}
        {{name}}{{#unless required}}?{{/unless}}: {{{schemaType schema}}};
        {{/if}}
        {{#if operators}}
        {{name}}: {
          {{#each operators}}
            {{name}}{{#unless required}}?{{/unless}}: {{{schemaType schema}}};
          {{/each}}
        }
        {{/if}}
      {{/each}}
    }
    {{/if}}
  }
  `;

  const template = Handlebars.compile(tpl);
  const content = template({ params, filters });
  return content;
}

/**
 * Handlebars helpers
 */

Handlebars.registerHelper("schemaType", schema => {
  return getSchemaType(schema);
});

Handlebars.registerHelper("jsonBodySchema", operation => {
  return getJsonBodySchema(operation);
});

Handlebars.registerHelper("withParamQuery", function(parameters, options) {
  return hasParamType(parameters, "query")
    ? options.fn(this)
    : options.inverse(this);
});

Handlebars.registerHelper("normalizeQuery", function(parameters) {
  return normalizeQuery(parameters);
});

Handlebars.registerHelper("withParamHeader", function(parameters, options) {
  return hasParamType(parameters, "header")
    ? options.fn(this)
    : options.inverse(this);
});

Handlebars.registerHelper("withParamCookie", function(parameters, options) {
  return hasParamType(parameters, "cookie")
    ? options.fn(this)
    : options.inverse(this);
});

Handlebars.registerHelper("requireParamQuery", function(parameters, options) {
  return requireParamType(parameters, "query")
    ? options.fn(this)
    : options.inverse(this);
});

Handlebars.registerHelper("requireParamHeader", function(parameters, options) {
  return requireParamType(parameters, "header")
    ? options.fn(this)
    : options.inverse(this);
});

Handlebars.registerHelper("requireParamCookie", function(parameters, options) {
  return requireParamType(parameters, "cookie")
    ? options.fn(this)
    : options.inverse(this);
});

Handlebars.registerHelper("withJsonBody", function(operation, options) {
  return hasJsonBody(operation) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("withResponseStatus", function(operation, options) {
  return hasResponseStatus(operation)
    ? options.fn(this)
    : options.inverse(this);
});

Handlebars.registerHelper("toRoute", function(path) {
  return path.replace(/{(.*?)}/g, ":$1");
});
Handlebars.registerHelper("toDollar", function(path) {
  return path.replace(/{(.*?)}/g, "$$$&");
});
