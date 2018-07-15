import jsonfile from "jsonfile";

import { promisify } from "./utils";

/**
 * async readfile
 *
 * @param {jsonfile.Path} file json file path
 * @param {{ encoding?: null, flag?: string, throws?: boolean, fs?: jsonfile.FS, reviver?: (key: any, value: any) => any }} options options
 * @returns {Promise<JSON>} result json object
 */
let readFile = (file, options) => {}; // 为了输出语法提示，额外写函数定义

/**
 *
 * @param {jsonfile.Path} file
 * @param {object} obj
 * @param {jsonfile.JFWriteOptions} options
 */
let writeFile = (file, obj, options) => {};

readFile = promisify(jsonfile.readFile, jsonfile);
writeFile = promisify(jsonfile.writeFile, jsonfile);

export { readFile, writeFile };
