import { call, cancel, fork, put, take } from "redux-saga/effects";
import { tapOn } from "@36node/redux";
import XLSX from "xlsx";

import { pickF } from "./lib";
import { xlsxTypes, isXlsx } from "./action";

/**
 * columns 的数据格式，均参考 antd table
 * https://ant.design/components/table-cn/#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8
 *
 * column 中特殊含义字段
 *
 * - key: 字段名称，通常用于导入
 * - dataIndex: 字段读取路径，通常用于导出
 *
 */

function readFile(file, columns) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async e => {
      /** read workbook */
      const data = e.target.result;
      const wb = XLSX.read(data, { type: "binary" });

      /** grab first sheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      /** to json */
      // TODO1: columns 支持children
      const rows = XLSX.utils.sheet_to_json(ws);

      /**
       * 字段转换
       * 把 columns key 对应到 excel 表格的表头
       */
      const mapKey = item =>
        columns.reduce(
          (newItem, col) => ({ ...newItem, [col.key]: item[col.title] }),
          {}
        );

      resolve(rows.map(mapKey));
    };
    reader.onerror = e => {
      reject(e);
    };
    reader.readAsBinaryString(file);
  });
}

function* _import(action = {}) {
  const { key, payload = {}, meta = {} } = action;
  const { file } = payload;
  const { columns } = meta;

  try {
    const rows = yield call(readFile, file, columns);
    yield put({
      type: xlsxTypes.IMPORT_SUCCESS,
      payload: rows,
      key,
      meta,
    });
  } catch (err) {
    yield put({
      type: xlsxTypes.IMPORT_FAILURE,
      error: err,
      key,
      meta,
    });
  }
}

function writeFile(name, type, columns, rows) {
  return new Promise((resolve, reject) => {
    try {
      /** convert from array of arrays to worksheet */

      // TODO1: columns 支持children
      // TODO2: 支持宽度定义
      const file = `${name}.${type}`;
      const wb = XLSX.utils.book_new();
      const keys = columns.map(c => c.dataIndex).filter(val => val);
      const data = rows.map(r => pickF(r, keys));
      const ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.sheet_add_aoa(ws, [columns.map(c => c.title)]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, file, { bookType: type });
      resolve(file);
    } catch (error) {
      reject(error);
    }
  });
}

function* _export(action = {}) {
  const { key, payload = {}, meta } = action;
  const { name, type, rows } = payload;
  const { columns } = meta;

  try {
    const file = yield call(writeFile, name, type, columns, rows);
    yield put({
      type: xlsxTypes.EXPORT_SUCCESS,
      payload: { file },
      key,
      meta,
    });
  } catch (error) {
    yield put({
      type: xlsxTypes.EXPORT_FAILURE,
      error,
      key,
      meta,
    });
  }
}

export const tapImportStart = (key, saga) =>
  tapOn(xlsxTypes.IMPORT_START, key, saga);
export const tapImportSuccess = (key, saga) =>
  tapOn(xlsxTypes.IMPORT_SUCCESS, key, saga);
export const tapImportFailure = (key, saga) =>
  tapOn(xlsxTypes.IMPORT_FAILURE, key, saga);

export const tapExportStart = (key, saga) =>
  tapOn(xlsxTypes.EXPORT_START, key, saga);
export const tapExportSuccess = (key, saga) =>
  tapOn(xlsxTypes.EXPORT_SUCCESS, key, saga);
export const tapExportFailure = (key, saga) =>
  tapOn(xlsxTypes.EXPORT_FAILURE, key, saga);

/**
 * watch xlsx saga
 */
export function* watchXlsx() {
  const tasks = {};

  while (true) {
    const action = yield take(isXlsx);
    const { type, key, meta = {} } = action;
    const entry = type + key;
    if (!meta.parallel && tasks[entry]) yield cancel(tasks[entry]);

    switch (type) {
      case xlsxTypes.IMPORT_START:
        tasks[entry] = yield fork(_import, action);
        break;
      case xlsxTypes.EXPORT_START:
        tasks[entry] = yield fork(_export, action);
        break;
      default:
        break;
    }
  }
}
