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
 * @param {string} name envrionment name
 * @param {object} opt option with { required, default }
 * @returns {*} value
 */

export function env(name, opt = {}) {
  const value = process.env[`APP_${name.toUpperCase()}`];

  if (opt.required && !value) {
    throw new Error(`environment ${name} is required`);
  }

  return value || opt.default;
}

/**
 * app
 */

export const PORT = env("PORT", { default: 9527 });
