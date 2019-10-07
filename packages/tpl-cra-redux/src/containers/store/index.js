import React, { Fragment } from "react";
import { put, select } from "redux-saga/effects";
import { Breadcrumb, Card, Icon } from "antd";
import { Switch, Route } from "react-router-dom";
import {
  connect,
  makeCron,
  makeCronSelector,
  tapCronTick,
} from "@36node/redux";

import PetsTable, { listPets, selectPets } from "./table";
import Exporter from "./exporter";
import Importer from "./importer";
import withBreadCrumb from "../../components/withBreadCrumb";
import Button from "../../components/button";
import { domain } from "../../constants";

const PAGER_KEY = domain.store.pager;

/**
 * actions and selectors
 */
const cronActions = makeCron(PAGER_KEY);
const selectCron = makeCronSelector(PAGER_KEY);

/**
 * saga effects
 */
tapCronTick(PAGER_KEY, function*(action) {
  const { payload } = action;
  const petsState = yield select(selectPets);
  const { query } = petsState.request;
  yield put(
    listPets({
      query: { ...query, offset: (payload.pos - 1) * 10, limit: 10 },
    })
  );
});

@withBreadCrumb("Pet-Store")
@connect(state => ({
  cron: selectCron(state),
  pets: selectPets(state),
}))
export default class extends React.PureComponent {
  startCron = () =>
    this.props.dispatch(
      cronActions.start({
        max: this.props.pets.total / 10,
        interval: 2000,
      })
    );
  stopCron = () => this.props.dispatch(cronActions.stop());
  resetCron = () => this.props.dispatch(cronActions.reset());

  renderTitle = () => {
    const { cron } = this.props;

    return (
      <div>
        <h1>Pets in store</h1>
        <span
          style={{
            paddingRight: 12,
            fontWeight: 600,
          }}
        >
          Auto Pager
        </span>
        <Button.Group>
          {cron.running ? (
            <Button onClick={this.stopCron} type="danger">
              Stop
            </Button>
          ) : (
            <Button type="primary" onClick={this.startCron}>
              Start
            </Button>
          )}
          <Button onClick={this.resetCron}>Reset</Button>
        </Button.Group>
      </div>
    );
  };

  renderExtra = () => {
    return (
      <Button.Group>
        <Button linkTo="/pet-store/export">
          <Icon type="download" /> Export
        </Button>
        <Button linkTo="/pet-store/import">
          <Icon type="upload" /> import
        </Button>
      </Button.Group>
    );
  };

  render() {
    return (
      <Fragment>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Store</Breadcrumb.Item>
        </Breadcrumb>
        <Card title={this.renderTitle()} extra={this.renderExtra()}>
          <PetsTable />
        </Card>
        <Switch>
          <Route exact path="/*/export" component={Exporter} />
          <Route exact path="/*/import" component={Importer} />
        </Switch>
      </Fragment>
    );
  }
}
