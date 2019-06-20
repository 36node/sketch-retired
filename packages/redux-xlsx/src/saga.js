import {
  call,
  put,
  all,
  takeLatest,
  take,
  fork,
  cancel,
  select,
} from "redux-saga/effects";
import { TYPES } from "./action";
import { toJsonData, toTableData } from "./lib";
import { isFunction } from "lodash";
import CSV from "./csv";
import XLSX from "xlsx";
import { ERROR, FILE_ERROR, IMPORTING, FINISHED } from "./reducer";
import { Xlsxs } from "./xlsxs";
import { channel } from "redux-saga";
import { createImportSelector } from "./selector";

const SupportFileType = ["xlsx", "csv"];

const ImportTasks = new Map();
const ImportHandleChans = new Map();
const ImportWorkerTasks = new Map();
const HandleRecordsTasks = new Map();

/**
 * read csv file
 * @param {File} file
 * @param {[Object]} columns
 * @returns {Promise<[Object]>}
 */
export function readCsvFile(file, columns = []) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const text = reader.result;
        const csv = CSV.parse(text);
        const ws = XLSX.utils.aoa_to_sheet(csv);
        const jsonData = await toJsonData(columns, ws);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
}

/**
 * read xlsx file
 * @param {File} file
 * @param {[Object]} columns
 * @returns {Promise<[Object]>}
 */
export function readXlsxFile(file, columns = []) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async e => {
      let binary = "";
      const bytes = new Uint8Array(e.target.result);
      const length = bytes.byteLength;
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      try {
        const oFile = XLSX.read(binary, {
          type: "binary",
          cellDates: true,
          cellStyles: true,
        });

        const result = [];

        for (let name of oFile.SheetNames) {
          const sheet = oFile.Sheets[name];
          const jsonData = await toJsonData(columns, sheet);
          result.push(...jsonData);
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsArrayBuffer(file);
  });
}

export function readFile(file, columns = []) {
  const { type } = file;

  switch (type) {
    case "text/csv":
      return readCsvFile(file, columns);
    default:
      return readXlsxFile(file, columns);
  }
}

/**
 * determine weather object is a file
 */
export function isFile(file = {}) {
  const { name, type, size } = file;
  return name && type && size > 0;
}

function* hander(key, chan, handleRecord) {
  while (true) {
    const { row, record } = yield take(chan);
    const result = yield call(handleRecord, row, record);

    yield put({
      type: TYPES.IMPORT_HANDLE_RESULT,
      key,
      payload: result,
    });
  }
}

/**
 * handle records use mutil workers
 */
function* handleRecords(key, records = [], handleRecord, workerCount = 1) {
  const chan = yield call(channel);
  ImportHandleChans.set(key, chan);

  const tasks = [];
  for (let i = 0; i < workerCount; i++) {
    const task = yield fork(hander, key, chan, handleRecord);
    tasks.push(task);
  }

  ImportWorkerTasks.set(key, tasks);

  for (let row = 0; row < records.length; row++) {
    const record = records[row];
    yield put(chan, { row, record });
  }
}

/**
 *
 * @param {String} key
 * @param {File} dataSource
 * @param {[Object]} columns
 * @param {import("../typings/index").Xlsx} xlsx
 */
export function* handleImport(key, dataSource, columns, xlsx) {
  yield put({
    type: TYPES.SET_IMPORT_STATE,
    key,
    payload: {
      status: IMPORTING,
    },
  });

  const importOpts = xlsx.importOpts;

  const { beforeHandle, handleRecord, workerCount } = importOpts;

  let records = [];
  try {
    records = yield call(readFile, dataSource, columns);
    yield put({
      type: TYPES.SET_IMPORT_STATE,
      key,
      payload: {
        total: records.length,
      },
    });
  } catch (error) {
    yield put({
      type: TYPES.SET_IMPORT_STATE,
      key,
      payload: {
        status: FILE_ERROR,
        error: "File read error",
      },
    });
    return;
  }

  // before handle
  if (beforeHandle) {
    const ret = yield call(beforeHandle, records);

    if (ret) {
      yield put({
        type: TYPES.SET_IMPORT_STATE,
        key,
        payload: {
          ...ret,
        },
      });
    }
  }

  if (records.length > 0 && handleRecord) {
    const task = yield fork(
      handleRecords,
      key,
      records,
      handleRecord,
      workerCount
    );
    HandleRecordsTasks.set(key, task);
  }
}

/**
 * watch if import pregress finished
 */
function* watchImportFinished() {
  while (true) {
    const action = yield take(TYPES.IMPORT_HANDLE_RESULT);
    const { key } = action;

    const xlsx = Xlsxs.get(key);

    if (xlsx) {
      const selector = createImportSelector(xlsx.key, xlsx.reduxPath);

      const importState = yield select(selector);

      const { total, count } = importState;

      if (count >= total) {
        yield put({
          type: TYPES.SET_IMPORT_STATE,
          key,
          payload: {
            status: FINISHED,
          },
        });

        yield call(clearImport, key);
      }
    }
  }
}

/**
 * clear bg tasks and channel
 */
function* clearImport(key) {
  const handleChan = ImportHandleChans.get(key);

  if (handleChan) {
    handleChan.close();
    ImportHandleChans.delete(key);
  }

  const workerTasks = ImportWorkerTasks.get(key);

  if (workerTasks) {
    for (const t of workerTasks) {
      yield cancel(t);
    }

    ImportWorkerTasks.delete(key);
  }

  const handleRecordTask = HandleRecordsTasks.get(key);

  if (handleRecordTask) {
    yield cancel(handleRecordTask);
    HandleRecordsTasks.delete(key);
  }

  const importTask = ImportTasks.get(key);
  if (importTask) {
    yield cancel(importTask);
    ImportTasks.delete(key);
  }
}

/**
 * watch import progress cancel or reset
 */
export function* watchImportCancel() {
  while (true) {
    const action = yield take([TYPES.IMPORT_CANCEL, TYPES.IMPORT_RESET]);
    const { key } = action;

    yield call(clearImport, key);
  }
}

export function* watchImport(action = {}) {
  const { payload = {}, meta = {}, key } = action;

  if (!Xlsxs.has(key)) {
    throw new Error(`redux-xlsx: ${key} of xlsx not registerred!`);
  }

  const xlsx = Xlsxs.get(key);

  const { columns = [] } = meta;

  const { dataSource } = payload;

  if (!dataSource) {
    throw new Error(`redux-xlsx: import action should has dataSource!`);
  }

  if (!Xlsxs.has(key)) {
    throw new Error(`redux-xlsx: ${key} of xlsx not registerred!`);
  }

  try {
    // dataSource is file object
    if (isFile(dataSource)) {
      // begin import
      const task = yield call(handleImport, key, dataSource, columns, xlsx);
      ImportTasks.set(key, task);
    } else {
      throw new Error(`redux-xlsx: import action dataSource must be a file!`);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: TYPES.SET_IMPORT_STATE,
      key,
      payload: {
        status: ERROR,
        error,
      },
    });
  }
}

/**
 * wirte xlsx file
 * @param {String} fileName
 * @param {String} fileType
 * @param {XLSX.Sheet} ws  sheet
 */
export function writeFile(fileName, fileType, ws) {
  return new Promise((resolve, reject) => {
    try {
      const wb = XLSX.utils.book_new();
      const finalFileName = `${fileName}.${fileType}`;
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, finalFileName, { bookType: fileType });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function* watchExport(action) {
  const { payload = {}, meta = {}, key } = action;

  if (!Xlsxs.has(key)) {
    throw new Error(`redux-xlsx: ${key} of xlsx not registerred!`);
  }

  const xlsx = Xlsxs.get(key);

  const exportOpts = xlsx.exportOpts;

  const { dataSource } = exportOpts;

  yield put({
    type: TYPES.SET_EXPORT_STATE,
    key,
    payload: {
      loading: true,
    },
  });

  try {
    const { fileName = "export", fileType = "xlsx", params = {} } = payload;

    const { columns = [] } = meta;

    let records;

    if (!SupportFileType.includes(fileType)) {
      throw new Error(
        "redux-xlsx: export filetype should be on of " +
          SupportFileType.join(",")
      );
    }
    if (isFunction(dataSource)) {
      //is function
      records = yield call(dataSource, params);
    } else {
      throw new Error("redux-xlsx: export dataSource should a function!");
    }

    const ws = yield call(toTableData, columns, records);

    yield call(writeFile, fileName, fileType, ws);
  } catch (error) {
    console.log(error);
  } finally {
    yield put({
      type: TYPES.SET_EXPORT_STATE,
      key,
      payload: {
        loading: false,
      },
    });
  }
}

export default function* watchXlsx() {
  yield all([
    takeLatest(TYPES.IMPORT, watchImport),
    takeLatest(TYPES.EXPORT, watchExport),
    fork(watchImportCancel),
    fork(watchImportFinished),
  ]);
}
