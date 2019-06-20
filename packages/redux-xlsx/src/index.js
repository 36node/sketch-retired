import { TYPES } from "./action";
import { registerXlsx, Xlsxs } from "./xlsxs";
import { camelCaseKey } from "./lib";

class Xlsx {
  constructor(key, { reduxPath, importOpts, exportOpts }) {
    this._key = key;
    this._importOpts = importOpts;
    this._exportOpts = exportOpts;

    if (!reduxPath) {
      this._reduxPath = camelCaseKey(key);
    }
  }

  get key() {
    return this._key;
  }

  get reduxPath() {
    return this._reduxPath;
  }

  get importOpts() {
    return this._importOpts || {};
  }

  get exportOpts() {
    return this._exportOpts || {};
  }

  get actions() {
    return {
      import: ({ columns = [], dataSource }, meta = {}) => ({
        type: TYPES.IMPORT,
        key: this.key,
        payload: {
          dataSource,
        },
        meta: {
          ...meta,
          columns,
        },
      }),
      importReset: () => ({
        type: TYPES.IMPORT_RESET,
        key: this.key,
      }),
      importCancel: () => ({
        type: TYPES.IMPORT_CANCEL,
        key: this.key,
      }),
      export: (
        { columns, fileName = "export", fileType = "xlsx", params = {} },
        meta = {}
      ) => ({
        type: TYPES.EXPORT,
        key: this.key,
        payload: {
          fileName,
          fileType,
          params,
        },
        meta: {
          ...meta,
          columns,
        },
      }),
    };
  }
}

export function createXlsxActions(key, opts = {}) {
  if (!key) {
    throw new Error("Xlsx need a key");
  }

  if (Xlsxs.has(key)) {
    return Xlsxs.get(key).actions;
  }
  const xlsx = new Xlsx(key, opts);
  registerXlsx(xlsx);
  return xlsx.actions;
}

export { default as xlsxReducer } from "./reducer";

export { createExportSelector, createImportSelector } from "./selector";

export { default as watchXlsx } from "./saga";
