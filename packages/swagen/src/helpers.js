import Handlebars from "handlebars";
import hbsHelper from "handlebars-helpers";
import { upperFirst } from "lodash";

hbsHelper({
  handlebars: Handlebars,
});

/**
 * get schema type
 *
 * @param {*} schema swagger schema object
 * @returns {String} parsed type
 */

export function getSchemaType(schema = {}) {
  let { type, $ref } = schema;

  if (type === "integer") return "Number";
  if (type) return upperFirst(type);

  if ($ref) {
    const segs = $ref.split("/");
    if (segs.length < 2) {
      throw new Error(`ref pattern is wrong: ${$ref}`);
    }
    return `${segs[segs.length - 2]}.${upperFirst(segs[segs.length - 1])}`;
  }
}

/**
 * get schema name
 *
 * @param {*} schema swagger schema object
 * @returns {String} parsed schema name
 */

export function getSchemaName(schema = {}) {
  let { type, items } = schema;

  if (type === "array") {
    return `${upperFirst(type)}<${getSchemaName(items)}>`;
  }

  return getSchemaType(schema);
}

/**
 * Handlebars helpers
 */

Handlebars.registerHelper("schemaType", schema => {
  return getSchemaType(schema);
});

Handlebars.registerHelper("schemaName", schema => {
  return getSchemaName(schema);
});
