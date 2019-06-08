import pickBy from "lodash/pickBy";
import startsWith from "lodash/startsWith";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { camelizeKeys } from "humps";
import { safeToNumber } from "./util";

/**
 * 将标准url中的query 格式转换成 标准 query object
 * @param {object} fromUrl query object from url
 */
export default function normalize(fromUrl) {
  const filters = pickBy(fromUrl, (_, key) => !startsWith(key, "_"));
  const others = pickBy(fromUrl, (_, key) => startsWith(key, "_"));

  const ret = {};
  const {
    _limit,
    _offset,
    _sort,
    _populate,
    _select,
    _group,
    ...custom
  } = others;

  if (!isNil(_limit)) ret.limit = safeToNumber(_limit);
  if (!isNil(_offset)) ret.offset = safeToNumber(_offset);
  if (!isNil(_sort)) ret.sort = _sort;
  if (!isNil(_populate)) ret.populate = _populate;
  if (!isNil(_select)) ret.select = _select;
  if (!isNil(_group)) ret.group = _group;

  // handle filters
  const filter = Object.keys(filters).reduce((acc, key) => {
    let val = filters[key];

    if (!val) return acc;

    // `_gt`, `_lt`, `_gte` `_lte` or `_ne`
    let match = /(.+)_(gt|lt|gte|lte|ne)$/.exec(key);
    if (match) {
      const path = match[1];
      const op = match[2];
      acc[path] = acc[path] || {};
      acc[path][`$${op}`] = val;
      return acc;
    }

    // `_like`
    match = /(.+)_like/.exec(key);
    if (match) {
      const path = match[1];

      // _like support array
      if (Array.isArray(val)) {
        acc[path] = { $regex: val.map(v => new RegExp(v, "i")) };
      } else {
        acc[path] = { $regex: new RegExp(val, "i") };
      }

      return acc;
    } else if (val === "true") acc[key] = true;
    else if (val === "false") acc[key] = false;
    else if (typeof val === "string") {
      acc[key] = val.trim();
    } else acc[key] = val;

    return acc;
  }, {});

  if (!isEmpty(filter)) {
    ret.filter = camelizeKeys(filter, (key, convert) =>
      key === "id" ? "_id" : convert(key)
    );
  }

  return {
    ...ret,
    ...custom,
  };
}
