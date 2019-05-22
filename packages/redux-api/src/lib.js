import {
  isArray,
  isObjectLike,
  isPlainObject,
  map,
  transform,
  set,
  camelCase,
} from "lodash";

function createIteratee(converter, self) {
  return (result, value, key) =>
    set(result, converter(key), isObjectLike(value) ? self(value) : value);
}

function createHumps(keyConverter) {
  return function humps(node) {
    if (isArray(node)) return map(node, humps);
    if (isPlainObject(node))
      return transform(node, createIteratee(keyConverter, humps));
    return node;
  };
}

export const humps = createHumps(camelCase);

/**
 * camel case key
 * @param {String} key
 */
export const camelCaseKey = key => {
  return key
    .split(".")
    .map(k => camelCase(k))
    .join(".");
};
