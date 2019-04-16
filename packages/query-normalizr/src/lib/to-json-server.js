import { safeToNumber, safeToArray } from "./util";
import { isNil, startsWith, pickBy, trimStart } from "lodash";

/**
 * 将url中的query 转换为 json server 的query 格式
 * @param {string} fromUrl query object from url
 */
export default function toJsonServer(fromUrl) {
  const filters = pickBy(fromUrl, (_, key) => !startsWith(key, "_"));
  const others = pickBy(fromUrl, (_, key) => startsWith(key, "_"));

  const ret = {};

  const { _limit, _offset = 0, _sort, _populate } = others;

  // _limit, _offset 转换为 _start 和 _limit
  if (!isNil(_limit)) {
    ret._limit = safeToNumber(_limit);
    ret._start = safeToNumber(_offset);
  }

  // _sort 转换为 _order, _sort
  if (!isNil(_sort)) {
    const sort = safeToArray(_sort);
    const order = sort.map(s => (startsWith(s, "-") ? "desc" : "asc"));

    ret._sort = sort.map(s => trimStart(s, "-")).join(",");
    ret._order = order.join(",");
  }

  // 将 populate 转换为为 _embed
  if (!isNil(_populate)) {
    const embed = safeToArray(_populate);
    ret._embed = embed.join(",");
  }

  return {
    ...ret,
    ...filters,
  };
}
