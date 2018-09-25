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

export function env(name, option) {
  const value = process.env[name];

  if (option.required && !value) {
    throw new Error(`environment ${name} is required`);
  }

  return value || option.default;
}

/**
 * exports
 */
export const PORT = env("APP_PORT", { default: 9527 });
export const BASE = env("APP_BASE", { default: "/petstore/v0" });

/**
 * Mongodb
 */

export const MONGODB_CONNECTION = env("APP_MONGODB_CONNECTION", {
  default: "mongodb://localhost/petstore",
});
