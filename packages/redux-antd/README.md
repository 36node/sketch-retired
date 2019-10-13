# Redex-Antd

[![version][0]][1] [![downloads][2]][3]

HOC for antd to connect @36node/redux

- table
- form

## Install

```sh
yarn install @36node/redux-antd
```

## createForm

It is quite easy to put antd-form into redux, just use createForm, and done.

Read packages/tpl-cra-redux for more detail.

```js
import React, { PureComponent } from "react";
import createForm from "@36node/redux-antd";

@createForm("example")
class ReduxFormExample extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        ... antd form ...
      </Form>
    );
  }
}
```

## createTable

```js
import React from "react";
import { Table } from "antd";
import { makeApiSelector } from "@36node/redux";
import { createTable } from "@36node/redux-antd";

const PETS_KEY = "pets";
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

/**
 * Pets table
 */
@createTable(PETS_KEY, { apiAction: listPets, apiSelector: selectPets })
export default class extends React.Component {
  render() {
    return <Table columns={columns} {...this.props.table} />;
  }
}
```

[0]: https://img.shields.io/npm/v/@36node/redux-antd.svg?style=flat
[1]: https://npmjs.com/package/@36node/redux-antd
[2]: https://img.shields.io/npm/dm/@36node/redux-antd.svg?style=flat
[3]: https://npmjs.com/package/@36node/redux-antd
