import React from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import { makeApiSelector } from "@36node/redux";

export default (key, { selectXlsx, xlsxActions, makeList }) => {
  /**
   * actions and selectors
   */
  const EXPORTER_KEY = key;
  const list = makeList(EXPORTER_KEY);
  const selectList = makeApiSelector(EXPORTER_KEY);

  @connect(state => ({
    petList: selectList(state),
    xlsx: selectXlsx(state),
  }))
  class Exporter extends React.Component {
    componentDidMount() {
      this.props.dispatch(list());
    }

    handleCancel = () => {
      if (this.props.onToggle) this.props.onToggle();
    };

    handleOk = () => {
      const { result } = this.props.petList;
      if (this.props.onToggle) this.props.onToggle();

      this.props.dispatch(
        xlsxActions.export({ name: "pet", type: "xlsx", rows: result })
      );
    };

    render() {
      const { loading, result } = this.props.petList;
      const { exporting } = this.props.xlsx;
      const { visible = false } = this.props;

      return (
        <Modal
          title="Exporting"
          visible={visible}
          onOk={this.handleOk}
          okText="Export"
          confirmLoading={loading || exporting}
          onCancel={this.handleCancel}
          width={800}
        >
          {loading ? (
            <p>Preparint data... </p>
          ) : (
            <div> {`Click OK to download ${result.length} pets`} </div>
          )}
        </Modal>
      );
    }
  }
  return Exporter;
};
