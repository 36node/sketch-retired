// import SwaggerParser from "swagger-parser";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";

import parse from "./parse";
import "./helpers";

/**
 * make directory
 *
 * @param {*} dir target directory
 */

function mkdir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}

/**
 * generate file through handlebars
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
 * generate code for koa server
 *
 * @param {String} target target folder
 * @param {String} swaggerFile openapi.yml
 */

export function genKoaCode(target, swaggerFile) {
  parse(swaggerFile).then(function(swagger) {
    const { api, components } = swagger;
    const tplAPI = path.join(__dirname, "../templates/api.hbs");
    const tplSchemas = path.join(__dirname, "../templates/schemas.hbs");
    const tplUtils = path.join(__dirname, "../templates/utils.hbs");

    mkdir(path.join(target, "api"));
    mkdir(path.join(target, "api/lib"));

    // copy lib.js
    fs.copyFileSync(tplUtils, path.join(target, "api/lib/utils.js"));
    generateFile(tplSchemas, path.join(target, "api/lib/schemas.js"), components.schemas);

    for (let name in api) {
      if (api[name]) generateFile(tplAPI, path.join(target, "api", `${name}.js`), api[name]);
    }
  });
}
