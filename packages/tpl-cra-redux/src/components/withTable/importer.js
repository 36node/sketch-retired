import React from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import { put, select } from "redux-saga/effects";
import { Upload, Button, message, Progress, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  makeProgress,
  makeProgressSelector,
  tapOn,
  withSaga,
  makeCron,
  makeCronSelector,
  tapCronTick,
} from "@36node/redux";

const DOING = "DOING";
const TODO = "TODO";
const DONE = "DONE";

export default (IMPORTER_KEY, { title, create, xlsxActions, xlsxSelector }) => {
  /**
   * actions and selectors
   */
  const CREATE_TYPES = create().meta.types;
  const CREATE_KEY = create().key;
  const cronActions = makeCron(IMPORTER_KEY);
  const cronSelector = makeCronSelector(IMPORTER_KEY);
  const progressActions = makeProgress(IMPORTER_KEY);
  const progressSelector = makeProgressSelector(IMPORTER_KEY);

  /**
   * saga effects
   */
  @withSaga(
    tapCronTick(IMPORTER_KEY, function*(action) {
      const { pos } = action.payload;
      const xlsx = yield select(xlsxSelector);
      yield put(create({ body: xlsx.result[pos - 1] }));
    }),
    tapOn(CREATE_TYPES.SUCCESS, CREATE_KEY, function*(action) {
      yield put(progressActions.increase());
    }),
    tapOn(CREATE_TYPES.FAILURE, CREATE_KEY, () => {
      message("Failed to import");
    })
  )
  /**
   * data
   */
  @connect(state => {
    const xlsx = xlsxSelector(state);
    const cron = cronSelector(state);
    const progress = progressSelector(state);
    return { cron, xlsx, progress };
  })
  /**
   * ui
   */
  class Importer extends React.Component {
    state = {
      fileReady: false,
      step: TODO,
    };

    static getDerivedStateFromProps(nextProps, preState) {
      const { progress } = nextProps;

      if (preState.step === DOING && progress.max === progress.pos) {
        return { ...preState, step: DONE };
      }

      return null;
    }

    close = () => {
      this.props.dispatch(cronActions.stop());
      this.props.dispatch(cronActions.reset());
      if (this.props.onToggle) this.props.onToggle();
    };

    upload = () => {
      const { xlsx } = this.props;
      const max = xlsx.result.length;

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
      this.setState({ step: DOING });
    };

    selectFile = file => {
      this.setState({ fileReady: true });
      this.props.dispatch(
        xlsxActions.import({
          file,
        })
      );
      this.props.dispatch(
        progressActions.reset({
          max: 100,
          pos: 0,
        })
      );
      return false;
    };

    OkText = {
      TODO: "开始导入",
      DOING: "导入中...",
      DONE: "完成",
    };

    HandleOk = {
      TODO: this.upload,
      DONE: this.close,
    };

    render() {
      const { progress } = this.props;
      const { fileReady, step } = this.state;

      const okText = this.OkText[step];
      const handleOk = this.HandleOk[step];

      return (
        <Modal
          title={`导入 - ${title}`}
          visible={true}
          onOk={handleOk}
          okButtonProps={{ disabled: !fileReady }}
          okText={okText}
          confirmLoading={step === DOING}
          onCancel={this.close}
          width={800}
        >
          <Upload beforeUpload={this.selectFile}>
            <Button>
              <UploadOutlined /> Select Excel File
            </Button>
          </Upload>
          {fileReady && (
            <Row style={{ marginTop: 30 }}>
              <Progress
                percent={Math.floor((progress.pos / progress.max) * 100)}
              />
            </Row>
          )}
        </Modal>
      );
    }
  }

  return Importer;
};
