/**
 * @constant
 * @exports
 * @type {Map<String, import(".").Assign}
 */
export const Assigns = new Map();

/**
 * register assign
 * @exports
 * @param {String} key
 * @param {import(".").Assign} assign
 */
export function registerAssign(key, assign) {
  Assigns.set(key, assign);
}
