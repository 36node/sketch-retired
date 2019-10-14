import React from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import { put, select } from "redux-saga/effects";
import { Upload, Button, Icon, message, Progress, Row } from "antd";

import {
  makeProgress,
  makeProgressSelector,
  tapOn,
  withSaga,
  makeCron,
  makeCronSelector,
  tapCronTick,
} from "@36node/redux";

export default (key, { selectXlsx, xlsxActions, makeCreate }) => {
  /**
   * actions and selectors
   */
  const IMPORTER_KEY = key;
  const createPet = makeCreate(IMPORTER_KEY, {}, { parallel: true });
  const cronActions = makeCron(IMPORTER_KEY);
  const selectCron = makeCronSelector(IMPORTER_KEY);
  const progressActions = makeProgress(IMPORTER_KEY);
  const selectProgress = makeProgressSelector(IMPORTER_KEY);

  const STORE_CREATE_PET = createPet().meta.types;

  /**
   * saga effects
   */
  @withSaga(
    tapCronTick(IMPORTER_KEY, function*(action) {
      const { pos } = action.payload;
      const xlsx = yield select(selectXlsx);
      yield put(createPet({ body: xlsx.rows[pos - 1] }));
    }),
    tapOn(STORE_CREATE_PET.SUCCESS, IMPORTER_KEY, function*(action) {
      yield put(progressActions.increase());
    }),
    tapOn(STORE_CREATE_PET.FAILURE, IMPORTER_KEY, () => {
      message("Failed to import");
    })
  )
  /**
   * data
   */
  @connect(state => {
    const xlsx = selectXlsx(state);
    const cron = selectCron(state);
    const progress = selectProgress(state);
    const finish = progress.max === progress.pos;
    return { cron, xlsx, progress, finish };
  })
  /**
   * ui
   */
  class Exporter extends React.Component {
    state = {
      fileReady: false,
    };

    close = () => {
      this.props.dispatch(cronActions.stop());
      this.props.dispatch(cronActions.reset());
      if (this.props.onToggle) this.props.onToggle();
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
      const { finish, progress, cron, visible } = this.props;
      const { fileReady } = this.state;

      const okText = finish
        ? "Complete"
        : cron.running
        ? "Uploading..."
        : "Start Import";
      const handleOk = finish ? this.close : this.upload;

      return (
        <Modal
          title="Import from Excel file"
          visible={visible}
          onOk={handleOk}
          okButtonProps={{ disabled: !fileReady }}
          okText={okText}
          confirmLoading={cron.running}
          onCancel={this.close}
          width={800}
        >
          <Upload beforeUpload={this.selectFile}>
            <Button>
              <Icon type="upload" /> Select Excel File
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

  return Exporter;
};
