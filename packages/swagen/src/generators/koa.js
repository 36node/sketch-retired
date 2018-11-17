import path from "path";
import "../helpers";
import parse from "../parse";
import { generateFile, mkdir, TemplatePath } from "./lib";

/**
 * Generate code for koa server api
 * @param {object} opts options
 * @param {string} opts.target code dist
 * @param {string} opts.swaggerFile openapi file path
 */
export default function genKoa({ target, swaggerFile }) {
  parse(swaggerFile)
    .then(function(swagger) {
      const { api } = swagger;
      const tplAPI = path.join(TemplatePath, "koa", "api.hbs");
      const tplDef = path.join(TemplatePath, "koa", "definitions.hbs");

      mkdir(target);
      generateFile(tplDef, path.join(target, "def.d.ts"), swagger, {
        parser: "typescript",
      });

      for (let name in api) {
        if (api[name])
          generateFile(tplAPI, path.join(target, `${name}.js`), api[name]);
      }
    })
    .catch(err => console.error(err));
}
