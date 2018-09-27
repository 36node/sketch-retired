import parse from "../parse";
import "../helpers";
import { mkdir, generateFile, TemplatePath } from "./lib";
import path from "path";

/**
 * Generate code for koa server
 *
 * @param {String} target target folder
 * @param {String} swaggerFile openapi.yml
 */

export default function genKoa(target, swaggerFile) {
  parse(swaggerFile)
    .then(function(swagger) {
      const { api } = swagger;
      const tplAPI = path.join(TemplatePath, "api.hbs");
      const tplDef = path.join(TemplatePath, "definitions.hbs");

      mkdir(target);
      generateFile(tplDef, path.join(target, "def.d.ts"), swagger);

      for (let name in api) {
        if (api[name]) generateFile(tplAPI, path.join(target, `${name}.js`), api[name]);
      }
    })
    .catch(err => console.error(err));
}
