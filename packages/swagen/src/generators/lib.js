import path from "path";
import fs from "fs";
import Handlebars from "handlebars";
import prettier from "prettier";

export const TemplatePath = path.join(__dirname, "../../templates");

/**
 * Make directory
 *
 * @param {*} dir target directory
 */

export function mkdir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}

/**
 * Generate file through handlebars
 *
 * @param {*} tplFile template file
 * @param {*} toFile target file
 * @param {*} data data for handlebars
 * @param {*} prettierOpts prettier opts
 */

export function generateFile(tplFile, toFile, data, prettierOpts = {}) {
  const content = fs.readFileSync(tplFile, "utf8");
  const template = Handlebars.compile(content);
  const parsed_content = template(data);
  const defaultPrettierOpts = { parser: "babylon", printWidth: 100, trailingComma: "es5" };

  fs.writeFileSync(
    toFile,
    prettier.format(parsed_content, { ...defaultPrettierOpts, ...prettierOpts }),
    "utf8"
  );
}
