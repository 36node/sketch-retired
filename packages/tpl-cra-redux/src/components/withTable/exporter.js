import React from "react";
import { Modal } from "antd";
import { connect } from "react-redux";

export default (
  key,
  { title, xlsxSelector, xlsxActions, list, listSelector }
) => {
  @connect(state => ({
    listState: listSelector(state),
    xlsx: xlsxSelector(state),
  }))
  class Exporter extends React.Component {
    componentDidMount() {
      // 所见即所得，导出的结果是 table 里看得到的
      this.props.dispatch(list(this.props.request));
    }

    handleCancel = () => {
      if (this.props.onToggle) this.props.onToggle();
    };

    handleOk = () => {
      const { columns = [], listState = {} } = this.props;
      const { result } = listState;
      if (this.props.onToggle) this.props.onToggle();
      this.props.dispatch(
        xlsxActions.export(
          { name: title, type: "xlsx", rows: result },
          { columns }
        )
      );
    };

    render() {
      const { loading, result } = this.props.listState;
      const { exporting } = this.props.xlsx;

      return (
        <Modal
          title={`导出 - ${title}`}
          visible={true}
          onOk={this.handleOk}
          okText="导出"
          confirmLoading={loading || exporting}
          onCancel={this.handleCancel}
          width={800}
        >
          {loading ? (
            <p>正在准备数据... </p>
          ) : (
            <div> {`下载选中的${result.length}条记录`} </div>
          )}
        </Modal>
      );
    }
  }
  return Exporter;
};
