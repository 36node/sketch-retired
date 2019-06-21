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

export interface ImportCancelAction extends BaseAction {}

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
  importCancel: () => ImportCancelAction;
}

export interface ImportState {
  results: [any]; // handle result
  total: number; // total record count
  count: number; // current importted count
  status: "NOT_STARTED" | "FILE_ERROR" | "ERROR" | "IMPORTING" | "FINISHED"; // import status
  error: any; // file error or other error
}

export interface ExportState {
  loading: Boolean;
}

export interface ImportOpts {
  beforeHandle: (records: [object]) => any;
  handleRecord: (row: number, record: object, worker: number) => any;
  workerCount: number;
}

export interface ExportOpts {
  dataSource: Aoo | Function;
}

declare class Xlsx {
  key: string;
  reduxPath?: string;
  importOpts?: object;
  exportOpts?: object;
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
