// import SwaggerParser from "swagger-parser";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";

import parse from "./parse";
import "./helpers";

/**
 * Make directory
 *
 * @param {*} dir target directory
 */

function mkdir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}

/**
 * Generate file through handlebars
 *
 * @param {*} tplFile template file
 * @param {*} toFile target file
 * @param {*} data data for handlebars
 */

function generateFile(tplFile, toFile, data) {
  const content = fs.readFileSync(tplFile, "utf8");
  const template = Handlebars.compile(content);
  const parsed_content = template(data);
  fs.writeFileSync(toFile, parsed_content, "utf8");
}

/**
 * Generate code for koa server
 *
 * @param {String} target target folder
 * @param {String} swaggerFile openapi.yml
 */

export function genKoa(target, swaggerFile) {
  parse(swaggerFile)
    .then(function(swagger) {
      const { api } = swagger;
      const tplAPI = path.join(__dirname, "../templates/api.hbs");
      const tplDef = path.join(__dirname, "../templates/definitions.hbs");

      mkdir(target);
      generateFile(tplDef, path.join(target, "def.d.ts"), swagger);

      for (let name in api) {
        if (api[name]) generateFile(tplAPI, path.join(target, `${name}.js`), api[name]);
      }
    })
    .catch(err => console.error(err));
}

/**
 * Genereate code for sdk
 *
 * @param {*} target
 * @param {*} swaggerFile
 * @param {*} name
 */
export function genSDK(target, swaggerFile, name) {
  // put sdk generation code here
}
