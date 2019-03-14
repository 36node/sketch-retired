const endpointMap = new Map();
const schemaMap = new Map();

/**
 * register key with endpoint and schema, schema is optional
 *
 * @param {string|Array} key 对应 state 中的 key, 可以嵌套形式例如 "a.b" 或者 ["a", "b"]
 * @param {function} endpoint sdk function
 * @param {Object} [schema] normalizr 的 schema
 */
export function register(key, endpoint, schema) {
  if (!key) throw new Error("key is required for redux-api register");

  if (endpoint) endpointMap.set(key, endpoint);
  if (schema) schemaMap.set(key, schema);
}

/**
 * get endpoint by key
 * @param {string|Array} key key in api state, string or array
 * @returns {function} sdk function
 */
export function getEndpoint(key) {
  return endpointMap.get(key);
}

/**
 * get schema by key
 * @param {string|Array} key key in api state, string or array
 * @returns {Object} normalizr schema
 */
export function getSchema(key) {
  return schemaMap.get(key);
}
