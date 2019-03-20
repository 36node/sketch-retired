import path from "path";

import parse from "../parse";
import "../helpers";
import { mkdir, generateFile, TemplatePath } from "../lib";

/**
 * Genereate code for sdk
 *
 * @param {object} opts options
 * @param {string} opts.target code dist
 * @param {string} opts.name sdk name
 */
export default function genSDK({ yamlFile, dist, name }) {
  // put sdk generation code here
  parse(yamlFile)
    .then(function(swagger) {
      const tplSdk = path.join(TemplatePath, "sdk", "sdk.hbs");
      const tplDef = path.join(TemplatePath, "sdk", "definitions.hbs");
      const { servers = [] } = swagger;
      const tplData = {
        sdkName: name,
        server: servers[0] || { url: "" },
        ...swagger,
      };

      if (dist) {
        mkdir(dist);
      }

      const finalDist = dist || process.cwd();

      generateFile(tplDef, path.join(finalDist, `.${name}.d.ts`), tplData, {
        parser: "typescript",
      });
      generateFile(tplSdk, path.join(finalDist, `${name}.js`), tplData);
    })
    .catch(err => console.error(err));
}
