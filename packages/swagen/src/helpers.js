import Handlebars from "handlebars";
import hbsHelper from "handlebars-helpers";
import { upperFirst } from "lodash";

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
  let { type, $ref, items } = schema;

  if (type === "integer") return "number";
  if (type === "array") {
    return `Array<${getSchemaType(items)}>`;
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
 * Determine whether the query parameter is included
 *
 * @param {Array} parameters the params
 * @param {string} type parameter type
 * @returns {boolean} return true if query in parameters
 */
export function hasParamType(parameters = [], type) {
  for (let p of parameters) {
    if (p.in === type) return true;
  }
  return false;
}

/**
 * Handlebars helpers
 */

Handlebars.registerHelper("schemaType", schema => {
  return getSchemaType(schema);
});

Handlebars.registerHelper("withParamQuery", function(parameters, options) {
  return hasParamType(parameters, "query") ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("withParamHeader", function(parameters, options) {
  return hasParamType(parameters, "header") ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("withParamCookie", function(parameters, options) {
  return hasParamType(parameters, "cookie") ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("toRoute", function(path) {
  return path.replace(/{(.*?)}/, ":$1");
});
