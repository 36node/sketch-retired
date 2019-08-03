import React from "react";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";

import { petStoreActions } from "../actions";
import { petStoreSelectors } from "../selectors";
import { Table, Card, Select, Button } from "antd";
import { isEmpty } from "lodash";

import Layout from "../components/layout";
import styled from "styled-components";
import { CronStatus } from "@36node/redux-cron";

const { Container } = Layout;

/**
 * Pets table
 */
@connect(state => {
  const listPetsState = petStoreSelectors.listPets(state) || {};
  const autoPagerState = petStoreSelectors.autoPager(state);

  return {
    pets: listPetsState.result,
    loading: listPetsState.loading,
    query: listPetsState.request.query,
    total: listPetsState.total,
    autoPager: autoPagerState,
  };
})
class PetsTable extends React.PureComponent {
  state = {
    interval: 10, // auto pager interval
  };

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

    this.props.dispatch(petStoreActions.listPets.request({ query }));
  };

  onCronStart = () => {
    this.props.dispatch(
      petStoreActions.pageCron.start(this.state.interval * 1000)
    );
  };

  onCronStop = () => {
    this.props.dispatch(petStoreActions.pageCron.stop());
  };

  onCronCancel = () => {
    this.props.dispatch(petStoreActions.pageCron.cancel());

    const { query } = this.props;

    this.props.dispatch(
      petStoreActions.listPets.request({
        query: {
          ...query,
          limit: 10,
          offset: 0,
        },
      })
    );
  };

  renderExtra = () => {
    const { autoPager = {} } = this.props;
    const { status } = autoPager;
    return (
      <Extra>
        <div
          style={{
            paddingRight: 12,
            fontWeight: 600,
          }}
        >
          Auto Pager(redux-cron)
        </div>

        <div>Interval:</div>

        <Select
          onChange={val => {
            this.setState({ interval: val });
          }}
          style={{ marginLeft: 12 }}
          value={this.state.interval}
        >
          <Select.Option value={5}>5s</Select.Option>
          <Select.Option value={10}>10s</Select.Option>
          <Select.Option value={20}>20s</Select.Option>
          <Select.Option value={60}>1min</Select.Option>
        </Select>

        {status === CronStatus.STOP && (
          <Button
            type="primary"
            style={{ marginLeft: 12 }}
            onClick={this.onCronStart}
          >
            Start
          </Button>
        )}

        {status === CronStatus.RUNNING && (
          <Button style={{ marginLeft: 12 }} onClick={this.onCronStop}>
            Stop
          </Button>
        )}

        <Button
          onClick={this.onCronCancel}
          style={{ marginLeft: 12 }}
          type="danger"
        >
          Cancel
        </Button>
      </Extra>
    );
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
      <Card title="Pet in store." extra={this.renderExtra()}>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          onChange={this.listPets}
          dataSource={pets}
          pagination={pagination}
        />
      </Card>
    );
  }
}
export default class extends React.PureComponent {
  render() {
    return (
      <DocumentTitle title="@36node - Pet Store Example">
        <Container>
          <PetsTable />
        </Container>
      </DocumentTitle>
    );
  }
}

const Extra = styled.div`
  display: flex;
  align-items: center;
`;
