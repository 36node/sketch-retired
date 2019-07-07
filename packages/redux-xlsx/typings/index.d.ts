import { Reducer, Action } from "redux";
import { Selector } from "reselect";
import { AllEffect } from "redux-saga/effects";
export interface Column {
  // column header title
  title: String;
  // dataIndex
  dataIndex: String;
  // format data when import
  importFormat: (val: any) => any;
  // format data when export
  exportFormat: (val: any) => any;

  // disable export
  disableExport: Boolean;

  // disable import
  disableImport: Boolean;
}

export declare type Columns = [Column];

export declare type FileTypes = "xlsx" | "csv";

export declare type Aoo = [Object];

export declare type ImportDataSource = File;

export interface Descriptor {
  [key: String]: ValidationRule;
}

export interface Option {
  reduxPath?: String;
  exportOpts: ExportOpts;
  importOpts: ImportOpts;
}

interface BaseAction extends Action {
  meta?: Object;
  key: String;
}

export interface ImportAction extends BaseAction {
  payload: {
    dataSource: ImportDataSource;
  };
  meta: {
    columns: Columns;
    descriptor: Descriptor;
  };
}

export interface ExportAction extends BaseAction {
  payload: {
    fileName: String;
    fileType: FileTypes;
  };
  meta: {
    columns: Columns;
  };
}

export interface ImportResetAction extends BaseAction {}

export interface ImportPausAction extends BaseAction {}

export interface XlsxActions {
  import: (
    { columns: Columns, dataSource: ImportDataSource },
    meta?: Object
  ) => ImportAction;

  export: (
    { columns: Columns, fileName: string, fileType: string, params: object },
    meta: Object
  ) => ExportAction;

  importReset: () => ImportResetAction;

  /**
   * Cancel import prgress and clear import redux state
   */
  importPause: () => ImportPauseAction;
}

export interface ImportState {
  total: number; // total record count
  count: number; // current importted count
  status: "NOT_STARTED" | "ERROR" | "IMPORTING" | "FINISHED" | "PAUSE"; // import status
  error?: any; // file error or other error
}

export interface ExportState {
  loading: Boolean;
}

export interface ImportOpts {
  /**
   * Before import hook, return false means stop import progress
   */
  beforeImport: (records: [object]) => boolean;
  handleRecord: (row: number, record: object, worker: number) => any; // on handle import record
  onFinished: () => any; // hook on finished
  onError: () => any; // hook on error
  workerCount: number;
}

export interface ExportOpts {
  dataSource: Aoo | Function;
}

declare class Xlsx {
  key: string;
  reduxPath?: string;
  importOpts?: ImportOpts;
  exportOpts?: ExportOpts;
  actions: XlsxActions;
}

export const xlsxReducer: Reducer;

export function createXlsxActions(key: String, opts: Option): XlsxActions;

export function createImportSelector(
  key: String,
  reduxPath: String
): (state: Object) => ImportState;

export function createExportSelector(
  key: String,
  reduxPath: String
): (state: Object) => ExportState;

export const watchXlsx: AllEffect;

export const ImportStatus: {
  NOT_STARTED: string;
  ERROR: string;
  IMPORTING: string;
  FINISHED: string;
  PAUSE: string;
};

export const XlsxTypes: {
  IMPORT: string;
  IMPORT_HANDLE_RESULT: string;
  IMPORT_PAUSE: string;
  IMPORT_RESET: string;
  SET_IMPORT_STATE: string;
  SET_EXPORT_STATE: string;
  EXPORT: string;
};
