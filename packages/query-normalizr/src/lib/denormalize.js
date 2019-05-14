import { isNil } from "lodash";
import { safeToNumber } from "./util";

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

  if (!isNil(limit)) ret._limit = safeToNumber(limit);
  if (!isNil(offset)) ret._offset = safeToNumber(offset);
  if (!isNil(sort)) ret._sort = sort;
  if (!isNil(populate)) ret._populate = populate;
  if (!isNil(select)) ret._select = select;
  if (!isNil(group)) ret._group = group;

  for (const key in filter) {
    const val = filter[key];

    if (typeof val !== "object" || Array.isArray(val)) {
      ret[key] = val;
    } else {
      // handle operator
      for (const operator in val) {
        switch (operator) {
          case "$lt":
          case "$gt":
          case "$lte":
          case "$gte":
          case "$ne":
            ret[keyWithOperator(key, operator)] = val[operator];
            break;
          case "$regex":
            // _like support array
            ret[keyWithOperator(key, "$like")] = Array.isArray(val[operator])
              ? val[operator].map(v => v.source)
              : val[operator].source;
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
