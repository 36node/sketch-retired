import React from "react";
import { Modal } from "antd";
import {
  connect,
  makeProgress,
  makeProgressSelector,
  tapOn,
} from "@36node/redux";
import { put, select } from "redux-saga/effects";
import { Upload, Button, Icon, message, Progress, Row } from "antd";
import { makeCron, makeCronSelector, tapCronTick } from "@36node/redux";

import { store } from "../../actions/api";
import { STORE_CREATE_PET } from "../../actions/types";
import { selectXlsx, xlsxActions } from "./table";
import { domain } from "../../constants";

/**
 * actions and selectors
 */
const IMPORTER_KEY = domain.store.importer;
const createPet = store.makeCreatePet(IMPORTER_KEY, {}, { parallel: true });
const cronActions = makeCron(IMPORTER_KEY);
const selectCron = makeCronSelector(IMPORTER_KEY);
const progressActions = makeProgress(IMPORTER_KEY);
const selectProgress = makeProgressSelector(IMPORTER_KEY);

/**
 * saga effects
 */
tapCronTick(IMPORTER_KEY, function*(action) {
  const { pos } = action.payload;
  const xlsx = yield select(selectXlsx);
  yield put(createPet({ body: xlsx.rows[pos - 1] }));
});

tapOn(STORE_CREATE_PET.SUCCESS, IMPORTER_KEY, function*(action) {
  yield put(progressActions.increase());
});

tapOn(STORE_CREATE_PET.FAILURE, IMPORTER_KEY, () => {
  message("Failed to import pets");
});

@connect(state => {
  const xlsx = selectXlsx(state);
  const cron = selectCron(state);
  const progress = selectProgress(state);
  const finish = progress.max === progress.pos;
  return { cron, xlsx, progress, finish };
})
export default class extends React.Component {
  state = {
    fileReady: false,
  };

  close = () => {
    const { history } = this.props;
    this.props.dispatch(cronActions.stop());
    this.props.dispatch(cronActions.reset());
    if (history) history.push("/pet-store");
  };

  upload = () => {
    const { xlsx } = this.props;
    const max = xlsx.rows.length;

    this.props.dispatch(
      cronActions.start({
        max,
        pos: 0,
        interval: 500,
      })
    );
    this.props.dispatch(
      progressActions.reset({
        max,
        pos: 0,
      })
    );
  };

  selectFile = file => {
    this.setState({ fileReady: true });
    this.props.dispatch(
      xlsxActions.import({
        file,
      })
    );
    return false;
  };

  render() {
    const { finish, progress, cron } = this.props;
    const { fileReady } = this.state;

    const okText = finish
      ? "Finished"
      : cron.running
      ? "Importing"
      : "Start import";
    const handleOk = finish ? this.close : this.upload;

    return (
      <Modal
        title="Importing pets from excel."
        visible={true}
        onOk={handleOk}
        okButtonProps={{ disabled: !fileReady }}
        okText={okText}
        confirmLoading={cron.running}
        onCancel={this.close}
        width={800}
      >
        <Upload beforeUpload={this.selectFile}>
          <Button>
            <Icon type="upload" /> select file
          </Button>
        </Upload>
        {fileReady && (
          <Row style={{ marginTop: 30 }}>
            <Progress percent={progress.pos} />
          </Row>
        )}
      </Modal>
    );
  }
}
