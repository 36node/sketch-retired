import { isNil } from "lodash";

/**
 * 根据key 和 operator 生成 key
 * @param {string} key
 * @param {string} operator
 */
function keyWithOperator(key, operator) {
  return `${key}_${operator.replace("$", "")}`;
}

export default function denormalize(queryObj = {}) {
  const {
    limit,
    offset,
    sort,
    populate,
    select,
    group,
    filter = {},
    ...custom
  } = queryObj;

  const ret = {};

  if (!isNil(limit)) ret._limit = Number(limit);
  if (!isNil(offset)) ret._offset = Number(offset);
  if (!isNil(sort)) ret._sort = sort;
  if (!isNil(populate)) ret._populate = populate;
  if (!isNil(select)) ret._select = select;
  if (!isNil(group)) ret._group = group;

  for (const key in filter) {
    const val = filter[key];

    // full text search
    if (key === "$text") {
      ret["q"] = val.$search;
      continue;
    }

    if (typeof val !== "object") {
      ret[key] = val;
    } else {
      // handle operator
      for (const operator in val) {
        switch (operator) {
          case "$lt":
          case "$gt":
          case "$lte":
          case "$gte":
            ret[keyWithOperator(key, operator)] = val[operator];
            break;
          case "$in":
            ret[key] = val[operator];
            break;
          case "$ne":
            // Array wildcard *
            if (Array.isArray(val[operator]) && val[operator].length === 0) {
              ret[key] = "*";
            } else {
              ret[keyWithOperator(key, operator)] = val[operator];
            }
            break;
          case "$eq":
            // Array wildcard none
            if (Array.isArray(val[operator]) && val[operator].length === 0) {
              ret[key] = "none";
            } else {
              ret[keyWithOperator(key, operator)] = val[operator];
            }
            break;
          // like
          case "$regex":
            ret[keyWithOperator(key, "$like")] = val[operator].source;
            break;

          default:
            break;
        }
      }
    }
  }

  return {
    ...ret,
    ...custom,
  };
}
