import get from "lodash/get";
import max from "lodash/max";
import XLSX from "xlsx";

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

export const getHeaderDeep = (cs, deep = 0) => {
  return max(
    cs.map(c => (c.children ? getHeaderDeep(c.children, deep + 1) : deep))
  );
};

export const genHeaderCells = (columns = []) => {
  const flattenCs = [];
  const merges = [];
  const maxDeep = getHeaderDeep(columns);

  const genHeader = (
    cs = [], // columns
    row = 0, // row 迭代
    col = 0 // col 迭代
  ) => {
    let currentCol = col;
    let ret = {};

    cs.forEach(c => {
      ret[XLSX.utils.encode_cell({ c: currentCol, r: row })] = {
        v: c.title,
        t: "s",
      };
      if (c.children) {
        // 如果有children 处理表头横向合并
        const childrenRet = genHeader(c.children, row + 1, currentCol);
        ret = { ...ret, ...childrenRet };
        merges.push({
          s: { r: row, c: currentCol },
          e: { r: row, c: currentCol + c.children.length - 1 },
        });
        currentCol += c.children.length;
      } else {
        // 纵向合并
        if (maxDeep - row > 0) {
          merges.push({
            s: { c: currentCol, r: row },
            e: { c: currentCol, r: maxDeep },
          });
        }
        currentCol++;
        flattenCs.push(c);
      }
    });
    return ret;
  };

  const headerCells = genHeader(columns);

  headerCells["!merges"] = merges;
  headerCells["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: maxDeep, c: flattenCs.length },
  });

  return {
    headerCells,
    flattenCs,
    maxDeep,
  };
};
