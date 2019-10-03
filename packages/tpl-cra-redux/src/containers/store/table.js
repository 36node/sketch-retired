import React from "react";
import { Table } from "antd";
import { makeApiSelector } from "@36node/redux";
import { createTable } from "@36node/redux-antd";

import { store } from "../../actions/api";

/**
 * actions and selectors
 */
export const listPets = store.makeListPets("store");
export const selectPets = makeApiSelector("store");

/**
 * data
 */
export const columns = [
  { title: "name", dataIndex: "name", key: "name" },
  { title: "owner", dataIndex: "owner", key: "owner" },
  {
    title: "tag",
    dataIndex: "tag",
    key: "tag",
    filters: [{ text: "CAT", value: "CAT" }, { text: "DOG", value: "DOG" }],
  },
  { title: "age", dataIndex: "age", key: "age", sorter: true },
];

/**
 * Pets table
 */
@createTable("store", { apiAction: listPets, apiSelector: selectPets })
export default class extends React.Component {
  render() {
    return <Table columns={columns} {...this.props.table} />;
  }
}
