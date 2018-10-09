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
      const sdkName = path.basename(swaggerFile).split(".")[0];

      const { servers = [] } = swagger;

      const tplData = {
        sdkName,
        server: servers[0] || { url: "" },
        ...swagger,
      };

      mkdir(target);
      generateFile(tplDef, path.join(target, `.${sdkName}.d.ts`), tplData, {
        parser: "typescript",
      });
      generateFile(tplSdk, path.join(target, `${sdkName}.js`), tplData);
    })
    .catch(err => console.error(err));
}
