import path from "path";
import fs from "fs";

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
  const configPath = path.dirname(dist) + "/config";
  mkdir(configPath);
  return parse(yamlFile)
    .then(function(swagger) {
      const { api } = swagger;

      // 获取所有api operationId，默认在 dist(./src/api)同目录下(./src/config)生成roles.js
      const rolePath = configPath + "/roles.js";
      let roles = [];
      for (let name in api) {
        for (let operation of api[name]["operations"]) {
          roles.push({
            operationId: operation["operationId"],
            roles: operation["roles"] || [],
          });
        }
      }
      // 将 roles 写入 roles.js 文件
      const tplRole = path.join(templatePath, "koa", "role.hbs");
      generate(tplRole, rolePath, { value: roles });

      // 生成 api 文件
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
