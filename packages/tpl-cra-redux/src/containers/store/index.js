import React, { Fragment } from "react";
import { Breadcrumb, Card, Icon } from "antd";
import { Switch, Route } from "react-router-dom";
import {
  connect,
  makeCron,
  makeCronSelector,
  tapCronTick,
  withSaga,
  reputApi,
} from "@36node/redux";

import PetsTable, { listPets, selectPets } from "./table";
import Exporter from "./exporter";
import Importer from "./importer";
import withBreadCrumb from "../../components/withBreadCrumb";
import Button from "../../components/button";
import { domain } from "../../constants";

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
 * ui
 */
@withBreadCrumb("Pet-Store")
export default class extends React.PureComponent {
  startCron = () =>
    this.props.dispatch(
      cronActions.start({
        interval: 2000,
      })
    );
  stopCron = () => this.props.dispatch(cronActions.stop());
  resetCron = () => this.props.dispatch(cronActions.reset());

  renderExtra = () => {
    const { total } = this.props;

    return (
      <div>
        <span style={{ marginRight: 24 }}>total {total}</span>
        <Button.Group>
          <Button linkTo="/pet-store/export">
            <Icon type="download" /> Export
          </Button>
          <Button linkTo="/pet-store/import">
            <Icon type="upload" /> import
          </Button>
        </Button.Group>
      </div>
    );
  };

  render() {
    const { cron } = this.props;

    return (
      <Fragment>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Store</Breadcrumb.Item>
        </Breadcrumb>
        <Card title="Pets in store" extra={this.renderExtra()}>
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
