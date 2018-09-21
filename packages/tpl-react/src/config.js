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
 * APP
 */

export const BASE = env("APP_BASE", { default: "/store/v1" });
