import dotenv from "dotenv";

/**
 * init dotenv
 * priority: environment -> .env
 *
 * Available settings
 *
 * APP_PORT=9527
 * APP_BASE_PATH=/v1
 * APP_JWT_PUBLIC_KEY=`a public key string`
 */

dotenv.config();

/**
 *
 * @param {*} name envrionment name
 * @param {*} option option with { required, default }
 * @returns {*} value
 */

export function env(name, { required, init } = {}) {
  const value = process.env[`REACT_APP_${name.toUpperCase()}`];

  if (required && !value) {
    throw new Error(`environment ${name} is required`);
  }

  return value || init;
}

/**
 * APP
 */
export const STORE_BASE = env("STORE_BASE", {
  init: "https://api.36node.com/petstore/v0",
});
export const TOKEN = env("TOKEN");
