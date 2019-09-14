import React from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { isEmpty } from "lodash";
import { makeApiSelector } from "@36node/redux";

import { store } from "../../actions/api";

/**
 * actions and selectors
 */
export const listPets = store.makeListPets("pets");
export const selectPets = makeApiSelector("pets");

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
@connect(selectPets)
export default class PetsTable extends React.PureComponent {
  componentDidMount() {
    this.listPets({ current: 1, pageSize: 10 });
  }

  listPets = (pagination = {}, filters = {}, sort = {}) => {
    const query = {};

    if (!isEmpty(pagination)) {
      const { current = 1, pageSize = 10 } = pagination;
      query.limit = pageSize;
      query.offset = (current - 1) * pageSize;
    }

    if (!isEmpty(filters)) {
      Object.keys(filters).forEach(k => {
        query[k] = filters[k];
      });
    }

    if (!isEmpty(sort)) {
      const { field, order } = sort;
      query.sort = (order === "ascend" ? "" : "-") + field;
    }

    this.props.dispatch(listPets({ query }));
  };

  render() {
    const { result = [], loading, total, request } = this.props;
    const { limit = 10, offset = 0 } = request.query || {};
    const pagination = {
      current: Math.floor(offset / limit + 1),
      pageSize: limit,
      total,
    };

    return (
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        onChange={this.listPets}
        dataSource={result}
        pagination={pagination}
      />
    );
  }
}
