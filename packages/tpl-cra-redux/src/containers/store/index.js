import React from "react";
import { Button, Table } from "antd";
import { connect } from "react-redux";
import {
  makeCron,
  makeCronSelector,
  tapCronTick,
  withSaga,
  reputApi,
} from "@36node/redux";

import withBreadCrumb from "../../components/withBreadCrumb";
import { withTable } from "../../components/withTable";
import { store } from "../../actions/api";
import { domain } from "../../constants";

const PETS_KEY = domain.store.pets;

// 多重复合列
// const columns = [
//   {
//     title: "AT",
//     key: "A",
//     children: [
//       {
//         title: "CT",
//         key: "C",
//         children: [
//           {
//             title: "ET",
//             key: "name",
//             dataIndex: "name",
//             children: undefined,
//           },
//           {
//             title: "FT",
//             key: "owner",
//             dataIndex: "owner",
//             children: undefined,
//           },
//         ],
//       },
//       {
//         title: "DT",
//         key: "tag",
//         dataIndex: "tag",
//         children: undefined,
//       },
//     ],
//   },
//   {
//     title: "BT",
//     dataIndex: "age",
//     key: "age",
//     children: undefined,
//   },
// ];

const columns = [
  { title: "name", dataIndex: "name", key: "name" /* fixed: true */ },
  // 复合列
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
  {
    title: "age",
    dataIndex: "age",
    key: "age",
    sorter: true,
    hidden: true,
  },
];

/**
 * actions and selectors
 */
const listPets = store.makeListPets(PETS_KEY);
const createPet = store.makeCreatePet("nobody", {}, { parallel: true });

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
}))
/**
 * table
 */
@withBreadCrumb("Pet-Store")
@withTable(PETS_KEY, {
  title: "Pets in Store",
  columns,
  create: createPet,
  list: listPets,
  importer: true,
})
export default class extends React.PureComponent {
  startCron = () =>
    this.props.dispatch(
      cronActions.start({
        interval: 2000,
      })
    );
  stopCron = () => this.props.dispatch(cronActions.stop());
  resetCron = () => this.props.dispatch(cronActions.reset());

  render() {
    const { cron, ...rest } = this.props;

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
        <Table /*scroll={{ x: "max-content" }}*/ {...rest} />
      </>
    );
  }
}
