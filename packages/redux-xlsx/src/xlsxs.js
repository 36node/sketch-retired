/**
 * @constant
 * @type {Map<String, import("../typings/index").Xlsx}
 */
export const Xlsxs = new Map();

export function registerXlsx(xlsx) {
  Xlsxs.set(xlsx.key, xlsx);
}
