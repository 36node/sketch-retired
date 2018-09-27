import path from "path";
import fs from "fs";
import Handlebars from "handlebars";

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
 */

export function generateFile(tplFile, toFile, data) {
  const content = fs.readFileSync(tplFile, "utf8");
  const template = Handlebars.compile(content);
  const parsed_content = template(data);
  fs.writeFileSync(toFile, parsed_content, "utf8");
}
