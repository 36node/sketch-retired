import get from "lodash/get";

/**
 * pick as lodash but return flattern object
 * @param {*} obj
 * @param {*} paths
 */
export function pickF(obj, paths = []) {
  const res = {};
  for (let key of paths) {
    res[key] = get(obj, key);
  }
  return res;
}
