import React from "react";
import { Table } from "antd";
import { makeApiSelector } from "@36node/redux";
import { createTable } from "@36node/redux-antd";
import { makeXlsx, makeXlsxSelector } from "@36node/redux-xlsx";

import { store } from "../../actions/api";
import { domain } from "../../constants";

const PETS_KEY = domain.store.pets;
const columns = [
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
 * actions and selectors
 */
export const listPets = store.makeListPets(PETS_KEY);
export const selectPets = makeApiSelector(PETS_KEY);
export const xlsxActions = makeXlsx(PETS_KEY, { columns });
export const selectXlsx = makeXlsxSelector(PETS_KEY);

/**
 * Pets table
 */
@createTable(PETS_KEY, { apiAction: listPets, apiSelector: selectPets })
export default class extends React.Component {
  render() {
    return <Table columns={columns} {...this.props.table} />;
  }
}
