import path from "path";
import fs from "fs";
const os = require("os");
const jsonfile = require("jsonfile");
const homedir = os.homedir();

const stderr = console.error.bind(console);

/**
 * Get fastman config dir, if not exist, make it
 */
export function configDir() {
  const dir = path.join(homedir, ".fastman");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir;
}

/**
 * set or rest api key in config file
 * @param apiKey postman api key, generated in https://docs.api.getpostman.com/?_ga=2.130537292.2138205523.1539075071-1493562217.1539075071#authentication
 */
export function writeConfig(config) {
  const dir = configDir();
  const configFile = path.join(dir, "config.json");
  const oldConfig = fs.existsSync(configFile) ? jsonfile.readFileSync(configFile) : {};
  jsonfile.writeFileSync(configFile, { ...oldConfig, ...config });
}

export function getConfig() {
  const dir = configDir();
  const configFile = path.join(dir, "config.json");
  if (!fs.existsSync(configFile)) {
    return {};
  }
  return jsonfile.readFileSync(configFile);
}

/**
 * get stored api key, if api key not config, return undefinded
 * @returns api key or undefinded
 */
export function getApiKey() {
  const config = getConfig();
  return config.apiKey;
}

/**
 * check api key is exist
 */
export function checkApiKey() {
  const apiKey = getApiKey();
  if (!apiKey) {
    stderr("Error: api key not config, please run:");
    stderr();
    stderr("fastman config -a <your-api-key>");
    process.exit(1);
  }
  return apiKey;
}
