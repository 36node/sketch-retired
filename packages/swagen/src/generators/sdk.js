import parse from "../parse";
import "../helpers";
import { mkdir, generateFile, TemplatePath } from "./lib";
import path from "path";

/**
 * Genereate code for sdk
 *
 * @param {*} target
 * @param {*} swaggerFile
 * @param {*} name
 */
export default function genSDK(target, swaggerFile, name) {
  // put sdk generation code here
  parse(swaggerFile)
    .then(function(swagger) {
      const tplSdk = path.join(TemplatePath, "sdk", "sdk.hbs");
      const tplDef = path.join(TemplatePath, "sdk", "definitions.hbs");
      const { servers = [] } = swagger;
      const tplData = {
        sdkName: name,
        server: servers[0] || { url: "" },
        ...swagger,
      };

      mkdir(target);
      generateFile(tplDef, path.join(target, `.${name}.d.ts`), tplData, {
        parser: "typescript",
      });
      generateFile(tplSdk, path.join(target, `${name}.js`), tplData);
    })
    .catch(err => console.error(err));
}
