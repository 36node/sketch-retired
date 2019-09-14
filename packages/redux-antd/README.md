# Redex-Antd

[![version][0]][1] [![downloads][2]][3]

HOC for antd to connect @36node/redux

## Install

```sh
yarn install @36node/redux-antd
```

## Use

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

[0]: https://img.shields.io/npm/v/@36node/redux-antd.svg?style=flat
[1]: https://npmjs.com/package/@36node/redux-antd
[2]: https://img.shields.io/npm/dm/@36node/redux-antd.svg?style=flat
[3]: https://npmjs.com/package/@36node/redux-antd
