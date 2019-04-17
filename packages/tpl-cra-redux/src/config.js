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
 * @param {string} name envrionment name
 * @param {object} opt option with { required, default }
 * @returns {*} value
 */

export function env(name, init) {
  const value = process.env[`REACT_APP_${name.toUpperCase()}`] || init;

  if (value === undefined) {
    throw new Error(`environment ${name} is missing`);
  }

  return value;
}

/**
 * APP
 */
export const STORE_BASE = env("STORE_BASE", "");
export const TOKEN = env("TOKEN", "some fake token");

/**
 * Test tpl-service
 */
// export const STORE_BASE = env(
//   "STORE_BASE",
//   "http://localhost:9527/petstore/v0"
// );
// export const TOKEN = env(
//   "TOKEN",
//   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7InJvbGVzIjpbIkFETUlOIiwiVVNFUiJdfX0.XA1kE_UdbOsU0rfmG3g1y3SpJ5aFVzPGFBHihVXv58sNatweqLHPEUAwhqobgKgmAbaKa3dlYrXEpHESHZ7AJgQYCfSeVxtsKyoQmcq9OYA0iFcH5oCWQgYqfeWJPOroMlMdNQax5kG-GkuaFbIiwiw-9j_ACS8CSPO9Oq2dQCA"
// );
