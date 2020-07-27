import path from "path";

import { mkdir, generate, parse } from "../lib";

/**
 * Genereate code for sdk
 *
 * @param {object} opts options
 * @param {string} opts.target code dist
 * @param {string} opts.name sdk name
 */
export default function genSDK({ yamlFile, dist = "./", templatePath }) {
  // put sdk generation code here
  parse(yamlFile)
    .then(function(swagger) {
      const tplSdk = path.join(templatePath, "sdk", "sdk.hbs");
      const tplDef = path.join(templatePath, "sdk", "definitions.hbs");
      const { servers = [] } = swagger;
      const tplData = {
        server: servers[0] || { url: "" },
        ...swagger,
      };

      if (dist) {
        mkdir(dist);
      }

      const finalDist = dist || process.cwd();

      generate(tplDef, path.join(finalDist, "typings", `index.d.ts`), tplData, {
        parser: "typescript",
      });

      generate(tplSdk, path.join(finalDist, "src", `index.js`), tplData);
    })
    .catch(err => console.error(err));
}
