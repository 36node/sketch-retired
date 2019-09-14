import { isAction, makeAction } from "@36node/redux";

const PREFIX = "@@xlsx";

export const xlsxTypes = {
  IMPORT_START: `${PREFIX}/IMPORT_START`,
  IMPORT_SUCCESS: `${PREFIX}/IMPORT_SUCCESS`,
  IMPORT_FAILURE: `${PREFIX}/IMPORT_FAILURE`,
  EXPORT_START: `${PREFIX}/EXPORT_START`,
  EXPORT_SUCCESS: `${PREFIX}/EXPORT_SUCCESS`,
  EXPORT_FAILURE: `${PREFIX}/EXPORT_FAILURE`,
  UPDATE_SHEET: `${PREFIX}/UPDATE_SHEET`,
  UPDATE_CELL: `${PREFIX}/UPDATE_CELL`,
};

export const isXlsx = isAction(new RegExp(`^${PREFIX}/.*$`));

export const makeXlsx = (key = "default", options = {}) => {
  const { columns } = options;

  return {
    import: makeAction(xlsxTypes.IMPORT_START, key, {}, { columns }),
    export: makeAction(xlsxTypes.EXPORT_START, key, {}, { columns }),
    updateSheet: makeAction(xlsxTypes.UPDATE_SHEET, key, {}, { columns }),
    updateCell: makeAction(xlsxTypes.UPDATE_CELL, key, {}, { columns }),
  };
};
