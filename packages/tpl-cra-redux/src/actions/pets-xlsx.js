import { put, take, select } from "redux-saga/effects";
import {
  successOf,
  failureOf,
  isSuccess,
  createApiActions,
} from "@36node/redux-api";
import * as CS from "../constants";
import { petstore } from "../sdk";
import { message } from "antd";
import { reduxXlsxSelectors } from "../selectors";
import { createXlsxActions } from "@36node/redux-xlsx";
import { petSchema } from "../schemas";

const key = CS.NS.REDUX_XLSX.PETS_XLSX;

const listPetsForExport = createApiActions(key, {
  endpoint: petstore.pet.listPets,
  schema: [petSchema],
});

function* exportDataSource(params = {}) {
  const { query } = params;
  const apiRequst = listPetsForExport.request;

  yield put(apiRequst({ query }));
  const apiResultAction = yield take([successOf(key), failureOf(key)]);

  if (isSuccess(apiResultAction)) {
    const apiResult = yield select(reduxXlsxSelectors.listPets);
    return apiResult.result;
  } else {
    message.error("Export fail!");
    return;
  }
}

const petsXlsx = createXlsxActions(key, {
  exportOpts: {
    dataSource: exportDataSource,
  },
  importOpts: {
    beforeHandle: beforeImportHandle,
    handleRecord: handleImportRecord,
    workerCount: 3,
  },
});

function beforeImportHandle(records = []) {
  console.log("import records:", records);
  console.log(
    "before import handle hook, you can validate records or cancel import"
  );

  return {
    successes: {},
    failures: {},
  };
}

function handleImportRecord(row, record) {
  console.log("Handle record:", record, "in row", row);

  return {
    row,
    result: "SUCCESS",
    message: "RIGHT",
  };
}

export default {
  listPetsForExport,
  petsXlsx,
};
