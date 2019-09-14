import { Schema } from "normalizr";
import { Saga } from "redux-saga";
import { PutEffect } from "redux-saga/effects";
import { Reducer } from "redux";
import {
  Action,
  ActionCreator,
  KeyPattern,
  Error,
  Selector,
} from "@36node/redux";

declare module "@36node/redux-xlsx" {
  interface Column {
    title: string;
    dataIndex: string;
  }

  interface XlsxState {
    importing: boolean;
    exporting: boolean;
    error: Error;
    rows: [object];
  }

  interface ImportPayload {
    file?: File;
    rows?: [object];
  }

  interface ExportPayload {
    rows?: [object];
  }

  interface ActionsMakerOpts {
    columns: [Column];
  }

  interface ActionsCreator {
    import: ActionCreator<ImportPayload>;
    export: ActionCreator<ExportPayload>;
  }

  /********************************************
   * xlsx                                     *
   ********************************************/

  interface xlsxTypes {
    IMPORT_START: string;
    IMPORT_SUCCESS: string;
    IMPORT_FAILURE: string;
    EXPORT_START: string;
    EXPORT_SUCCESS: string;
    EXPORT_FAILURE: string;
    UPDATE_SHEET: string;
    UPDATE_CELL: string;
  }

  interface XlsxReducerRoot {
    xlsx: Reducer<XlsxState, Action<ImportPayload | ExportPayload>>;
  }

  export const watchXlsx: Saga;
  export const xlsxReducerRoot: XlsxReducerRoot;

  export function tapImportStart(key: string, saga: Saga): void;
  export function tapImportSuccess(key: string, saga: Saga): void;
  export function tapImportFailure(key: string, saga: Saga): void;
  export function tapExportStart(key: string, saga: Saga): void;
  export function tapExportSuccess(key: string, saga: Saga): void;
  export function tapExportFailure(key: string, saga: Saga): void;

  /**
   * action type is xlsx or not
   * @param action action
   */
  export function isXlsx(
    action: Action<ImportPayload | ExportPayload>
  ): boolean;

  /**
   * make xlsx's actions creator
   * @param key redux store's key
   * @param options params
   */
  export function makeXlsx(
    key: KeyPattern,
    options?: ActionsMakerOpts
  ): ActionsCreator;

  /**
   * make xlsx's selector
   * @param key redux store's key
   * @param init default state
   */
  export function makeXlsxSelector(
    key: string,
    init?: XlsxState
  ): Selector<XlsxState>;
}
