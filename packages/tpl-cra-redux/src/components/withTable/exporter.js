import React from "react";
import { Modal } from "antd";
import { connect } from "react-redux";

export default (
  EXPORTER_KEY,
  { title, xlsxSelector, xlsxActions, list, listSelector }
) => {
  @connect(state => ({
    listState: listSelector(state),
    xlsx: xlsxSelector(state),
  }))
  class Exporter extends React.Component {
    componentDidMount() {
      this.props.dispatch(list());
    }

    handleCancel = () => {
      if (this.props.onToggle) this.props.onToggle();
    };

    handleOk = () => {
      const { result } = this.props.listState;
      if (this.props.onToggle) this.props.onToggle();
      this.props.dispatch(
        xlsxActions.export({ name: title, type: "xlsx", rows: result })
      );
    };

    render() {
      const { loading, result } = this.props.listState;
      const { exporting } = this.props.xlsx;

      return (
        <Modal
          title={`Exporting - ${title}`}
          visible={true}
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
