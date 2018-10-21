/**
 * init dotenv
 *
 * .env: Default.
 * .env.local: Local overrides. This file is loaded for all environments except test.
 * .env.development, .env.test, .env.production: Environment-specific settings.
 * .env.development.local, .env.test.local, .env.production.local: Local overrides of environment-specific settings.
 *
 * Available settings
 *
 * APP_PORT=9527
 * APP_BASE_PATH=/v1
 * APP_JWT_PUBLIC_KEY=`a public key string`
 */

/**
 *
 * @param {*} name envrionment name
 * @param {*} option option with { required, init }
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
export const STORE_BASE = env("STORE_BASE");
export const TOKEN = env("TOKEN");
