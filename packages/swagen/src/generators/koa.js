import path from "path";

import { generate, mkdir, parse } from "../lib";

/**
 * Generate code for koa server api
 * @param {object} opts options
 * @param {string} opts.dist code dist
 * @param {string} opts.yamlFile openapi file path
 */
export default function genKoa({
  dist = process.cwd(),
  yamlFile,
  templatePath,
}) {
  mkdir(dist);
  return parse(yamlFile)
    .then(function(swagger) {
      const { api } = swagger;
      const tplAPI = path.join(templatePath, "koa", "api.hbs");
      const tplDef = path.join(templatePath, "koa", "definitions.hbs");
      const tplSchema = path.join(templatePath, "koa", "schema.hbs");

      for (let name in api) {
        generate(tplAPI, path.join(dist, `${name}.js`), api[name]);
        generate(tplSchema, path.join(dist, `${name}.schema.js`), api[name]);
        generate(tplDef, path.join(dist, `${name}.d.ts`), api[name], {
          parser: "typescript",
        });
      }
    })
    .catch(err => console.error(err));
}
