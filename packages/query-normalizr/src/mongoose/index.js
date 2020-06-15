import { isNil, isArray, set } from "lodash";

function wrapValue(val, isRegex) {
  if (isArray(val)) return { $in: val.map(i => wrapValue(i, isRegex)) };
  if (isNil(val) || typeof val !== "string") return val;
  val = val.trim();
  if (isRegex) return new RegExp(val, "i");

  switch (val.toLowerCase()) {
    case "*":
      val = { $ne: [] };
      break;
    case "none":
      val = { $eq: [] };
      break;
    default:
  }

  return val;
}

/**
 * normalize object to mongoose query
 *
 * @param {import("mongoose").ListOptions} query query object from http request
 */
export default function normalize(query) {
  const {
    _limit: limit,
    _offset: offset,
    _sort: sort,
    _populate: populate,
    _select: select,
    _group: group,
    ...raw
  } = query;

  // reference https://github.com/36node/sketch/blob/master/docs/url.md
  const filter = Object.keys(raw).reduce((acc, key) => {
    let val = raw[key];
    let path = key === "id" ? "_id" : key;
    let isRegex = false;

    // `_like _not`
    let match = /(.+)_(like|not)/.exec(key);
    if (match) {
      path = match[1];
      isRegex = true;
    }

    // `_gt`, `_lt`, `_gte` `_lte` `_ne` `_not`
    match = /(.+)_(gt|lt|gte|lte|ne|not)$/.exec(key);
    if (match) {
      path = `${match[1]}.$${match[2]}`;
    }

    if (key === "q") {
      path = "$text";
      val = { $search: val };
    }

    return set(acc, path, wrapValue(val, isRegex));
  }, {});

  return {
    limit,
    offset,
    sort,
    populate,
    select,
    group,
    filter,
  };
}
