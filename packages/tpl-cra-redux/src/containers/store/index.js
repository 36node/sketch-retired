import React from "react";
import { Button, Table } from "antd";
import { connect } from "react-redux";
import {
  makeApiSelector,
  makeCron,
  makeCronSelector,
  tapCronTick,
  withSaga,
  reputApi,
} from "@36node/redux";
import { makeXlsx, makeXlsxSelector } from "@36node/redux-xlsx";

import withBreadCrumb from "../../components/withBreadCrumb";
import { withTable } from "../../components/withTable";
import { store } from "../../actions/api";
import { domain } from "../../constants";

const PETS_KEY = domain.store.pets;
const columns = [
  { title: "name", dataIndex: "name", key: "name", frozen: true },
  {
    title: "Pet's  owner and tag",
    key: "parent",
    children: [
      { title: "owner", dataIndex: "owner", key: "owner" },
      {
        title: "tag",
        dataIndex: "tag",
        key: "tag",
        filters: [{ text: "CAT", value: "CAT" }, { text: "DOG", value: "DOG" }],
      },
    ],
  },
  { title: "age", dataIndex: "age", key: "age", sorter: true, hide: true },
];

/**
 * actions and selectors
 */
export const listPets = store.makeListPets(PETS_KEY);
export const selectPets = makeApiSelector(PETS_KEY);
export const xlsxActions = makeXlsx(PETS_KEY, { columns });
export const selectXlsx = makeXlsxSelector(PETS_KEY);

const REFRESH_KEY = domain.store.refresh;

/**
 * actions and selectors
 */
const cronActions = makeCron(REFRESH_KEY);
const selectCron = makeCronSelector(REFRESH_KEY);

/**
 * saga effects
 */
@withSaga(
  tapCronTick(REFRESH_KEY, function*(action) {
    yield reputApi(listPets());
  })
)
/**
 * data
 */
@connect(state => ({
  cron: selectCron(state),
  total: selectPets(state).total,
}))
/**
 * table
 */
@withBreadCrumb("Pet-Store")
@withTable(PETS_KEY, {
  columns,
  makeList: store.makeListPets,
  makeCreate: store.makeCreatePet,
})
export default class extends React.Component {
  startCron = () =>
    this.props.dispatch(
      cronActions.start({
        interval: 2000,
      })
    );
  stopCron = () => this.props.dispatch(cronActions.stop());
  resetCron = () => this.props.dispatch(cronActions.reset());

  render() {
    const { cron } = this.props;

    return (
      <>
        <Button.Group>
          {cron.running ? (
            <Button onClick={this.stopCron} type="danger">
              Auto refresh Stop
            </Button>
          ) : (
            <Button type="primary" onClick={this.startCron}>
              Auto refresh Start
            </Button>
          )}
          <Button onClick={this.resetCron}>Reset</Button>
        </Button.Group>
        <Table {...this.props.table} />
      </>
    );
  }
}
