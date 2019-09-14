import React from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { makeApiSelector } from "@36node/redux";
import { makeXlsx, makeXlsxSelector } from "@36node/redux-xlsx";

import { store } from "../../actions/api";
import { columns } from "./table";

/**
 * actions and selectors
 */
const listPets = store.makeListPets("export");
const selectPets = makeApiSelector("export");
export const xlsxActions = makeXlsx("pets", { columns });
export const selectXlsx = makeXlsxSelector("pets");

@connect(state => ({
  petList: selectPets(state),
  xlsx: selectXlsx(state),
}))
export default class extends React.Component {
  componentDidMount() {
    this.props.dispatch(listPets());
  }

  handleCancel = () => {
    const { history } = this.props;
    if (history) history.push("/pet-store");
  };

  handleOk = () => {
    const { result } = this.props.petList;

    this.props.dispatch(
      xlsxActions.export({ name: "pet", type: "xlsx", rows: result })
    );
  };

  render() {
    const { loading, result } = this.props.petList;
    const { exporting } = this.props.xlsx;

    return (
      <Modal
        title="Exporting All Pets in store"
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
