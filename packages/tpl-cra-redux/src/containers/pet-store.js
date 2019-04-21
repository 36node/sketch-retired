import React from "react";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";

import { listPets } from "actions";
import {
  selectPets,
  selectListPetsLoading,
  selectListPetsQuery,
  selectListPetsTotal,
} from "selectors";
import { Table } from "antd";
import { isEmpty } from "lodash";

import { Container, Jumbotron } from "components/layout";

/**
 * Pets table
 */
@connect(state => ({
  pets: selectPets(state),
  loading: selectListPetsLoading(state),
  query: selectListPetsQuery(state),
  total: selectListPetsTotal(state),
}))
class PetsTable extends React.PureComponent {
  componentDidMount() {
    this.listPets({ current: 1, pageSize: 10 });
  }

  columns = [
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

    console.log(query);
    console.log(pagination, filters, sort);

    this.props.dispatch(listPets({ query }));
  };

  render() {
    const { pets = [], loading, total, query = {} } = this.props;

    const { limit = 10, offset = 0 } = query;
    const pagination = {
      current: Math.floor(offset / limit + 1),
      pageSize: limit,
      total,
    };

    return (
      <Table
        rowKey="id"
        loading={loading}
        columns={this.columns}
        onChange={this.listPets}
        dataSource={pets}
        pagination={pagination}
      />
    );
  }
}
export default class extends React.PureComponent {
  render() {
    return (
      <DocumentTitle title="@36node - Pet Store Example">
        <Container>
          <Jumbotron> Pets in store. </Jumbotron>
          <PetsTable />
        </Container>
      </DocumentTitle>
    );
  }
}
