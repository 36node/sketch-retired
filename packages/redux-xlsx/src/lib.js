import { camelCase, max, set, get, cloneDeep } from "lodash";
import XLSX from "xlsx";

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

const getMaxDeep = (cs, deep = 0) => {
  return max(
    cs.map(c => (c.children ? getMaxDeep(c.children, deep + 1) : deep))
  );
};

/**
 * worksheet to json
 * @param {[import('../typings/index.d').Column]} columns
 * @param {XLSX.Sheet} ws  sheet
 * @returns {[Object]} json data
 */
export function toJsonData(columns = [], ws = {}) {
  return new Promise(resolve => {
    const range = XLSX.utils.decode_range(ws["!ref"]);

    // 表头所占的行数
    const headerRows = getMaxDeep(columns);

    const colMap = new Map();

    // 每列实际对应的column 配置
    let curCol = 0;
    const getCol = (cs = columns) => {
      for (let c of cs) {
        if (c.children) {
          getCol(c.children);
        } else {
          colMap.set(curCol, c);
          curCol++;
        }
      }
    };

    getCol();

    const ret = [];
    // 数据每行循环
    for (let r = headerRows + 1; r <= range.e.r; r++) {
      const row = {};
      for (let c = 0; c < range.e.c; c++) {
        const column = colMap.get(c);
        const address = XLSX.utils.encode_cell({ r, c });
        const value = get(ws, [address, "v"]);

        if (column && column.dataIndex && !column.disableImport) {
          const val = column.importFormat ? column.importFormat(value) : value;
          set(row, column.dataIndex, val);
        }
      }

      ret.push(row);
    }

    resolve(ret);
  });
}

/**
 * Json object array to ws
 * @param {[import('../typings/index.d').Column]} columns
 * @param {[Object]} data
 * @returns {XLSX.Sheet}
 */
export function toTableData(columns = [], data = []) {
  return new Promise(resolve => {
    const filterColumn = (cs = []) => {
      const filtered = cs.filter(c => !c.disableExport);

      for (let c of filtered) {
        if (c.children) {
          c.children = filterColumn(c.children);
        }
      }

      return filtered;
    };

    columns = filterColumn(cloneDeep(columns));

    const flatColumns = []; // 数据索引顺序
    const merges = []; // 表头合并

    // 求出 columns 的深度
    const maxDeep = getMaxDeep(columns);

    const genHeaders = (cs = [], row = 0, col = 0) => {
      let currentCol = col;
      let ret = {};
      cs.forEach(c => {
        ret[XLSX.utils.encode_cell({ c: currentCol, r: row })] = {
          v: c.title,
          t: "s",
        };
        if (c.children) {
          // 如果有children 处理表头横向合并
          const childrenRet = genHeaders(c.children, row + 1, currentCol);
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
          flatColumns.push(c);
        }
      });
      return ret;
    };

    const tableData = genHeaders(columns);

    // 处理数据
    // 从 header 下一行开始计算数据
    let row = maxDeep + 1;
    for (let d of data) {
      for (let index = 0; index < flatColumns.length; index++) {
        const col = flatColumns[index];
        const value = col.exportFormat
          ? col.exportFormat(get(d, col.dataIndex), d)
          : get(d, col.dataIndex);

        tableData[XLSX.utils.encode_cell({ r: row, c: index })] = {
          v: value,
          t: "s",
        };
      }

      row++;
    }

    tableData["!merges"] = merges;
    tableData["!ref"] = XLSX.utils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: row - 1, c: flatColumns.length },
    });

    resolve(tableData);
  });
}
