import fs from "fs";
import Handlebars from "handlebars";
import prettier from "prettier";

/**
 * Make directory
 *
 * @param {*} dir target directory
 */
export function mkdir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}

/**
 * @param {string} path
 */
export function formatPath(path) {
  let result = path;
  if (path.charAt(0) === "/") {
    result = path.substr(1);
  }

  // format path parameter /{petId} to /:petId
  const rxp = /{([^}]+)}/g;
  const params = [];
  let curMatch;
  while ((curMatch = rxp.exec(path)) != null) {
    params.push(curMatch[1]);
  }
  for (let p of params) {
    result = result.replace(`{${p}}`, `:${p}`);
  }

  return result;
}

/**
 * Generate template content through handlebars
 *
 * @param {*} tplFile template file
 * @param {*} data data for handlebars
 *
 * @returns {string} parsed template content
 */
export function build(tplFile, data) {
  const content = fs.readFileSync(tplFile, "utf8");
  const template = Handlebars.compile(content);
  const parsed_content = template(data);
  return parsed_content;
}

/**
 * Generate file through handlebars
 *
 * @param {string} tplFile template file
 * @param {string} toFile target file
 * @param {object} data data for handlebars
 * @param {object} prettierOpts prettier opts
 */

export function generate(tplFile, toFile, data, prettierOpts = {}) {
  const parsed_content = build(tplFile, data);
  const defaultPrettierOpts = {
    parser: "babel",
    printWidth: 100,
    trailingComma: "es5",
  };

  fs.writeFileSync(
    toFile,
    prettier.format(parsed_content, {
      ...defaultPrettierOpts,
      ...prettierOpts,
    }),
    "utf8"
  );
}
