import { put, take, select } from "redux-saga/effects";
import {
  successOf,
  failureOf,
  isSuccess,
  createApiAction,
} from "@36node/redux-api";
import { actionTypes } from "../constants";
import { petstore } from "../sdk";
import { message } from "antd";
import { reduxXlsxSelectors } from "../selectors";
import { createXlsxActions } from "@36node/redux-xlsx";
import { petSchema } from "../schemas";

const baseType = actionTypes.REDUX_XLSX.PETS_XLSX;

const listPetsForExport = createApiAction(baseType, petstore.pet.listPets, {
  schema: [petSchema],
});

function* exportDataSource(params = {}) {
  const { query } = params;

  yield put(listPetsForExport({ query }));
  const apiResultAction = yield take([
    successOf(baseType),
    failureOf(baseType),
  ]);

  if (isSuccess(apiResultAction)) {
    const apiResult = yield select(reduxXlsxSelectors.listPets);
    return apiResult.result;
  } else {
    message.error("Export fail!");
    return;
  }
}

const petsXlsx = createXlsxActions(baseType, {
  exportOpts: {
    dataSource: exportDataSource,
  },
  importOpts: {
    beforeImport,
    handleRecord: handleImportRecord,
    workerCount: 3,
  },
});

function beforeImport(records = []) {
  console.log("import records:", records);
  console.log(
    "before import handle hook, you can validate records or cancel import"
  );
}

function handleImportRecord(row, record) {
  console.log("Handle record:", record, "in row", row);
}

export default {
  listPetsForExport,
  petsXlsx,
};
