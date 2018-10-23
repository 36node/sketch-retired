# tpl-react-redux

[![NPM version](https://img.shields.io/npm/v/tpl-react-redux.svg?style=flat)](https://npmjs.com/package/tpl-react-redux)
[![NPM downloads](https://img.shields.io/npm/dm/tpl-react-redux.svg?style=flat)](https://npmjs.com/package/tpl-react-redux)

## Usage

1. `yarn install`
2. dev: `yarn start`
3. build: `yarn build`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## circle-ci

需要在 circle-ci 配置的环境变量有

DOCKER_USER: docker hub 用户名
DOCKER_PASS: docker hub 密码
DOCKER_REGISTRY: docker hub 地址

## Mock Server

Tpl-react-redux has integrated [json-server](https://github.com/typicode/json-server)
into webpack-dev-server for testing your app,
you can generate mock data and config mock server through mock.js under root path.

To disable mock, set `REACT_AAP_DISABLE_MOCK=true` in .env file

```js
const faker = require("faker");
module.exports = {
  /**
   * Generate mock data
   */
  mockFn: () => {
    const data = { pets: [] };
    const tags = ["CAT", "DOG", "RABBIT"];

    for (let i = 0; i < 100; i++) {
      data.pets.push({
        id: i,
        name: faker.name.lastName(),
        tag: tags[faker.random.number(2)],
      });
    }

    return data;
  },
  /**
   * Config mock server
   */
  serverOpts: () => ({
    delay: 2000, // delay to responses (ms) [number]
  }),
};
```

## Philosopy

这段写起来难度有点大，先用中文写。

在`Redux`的参与下，我们需要把组件分成两种类型：

1. Container: 带状态的组件，通过 connect 将属性直接注入到组件中。外面调用这个组件的时候，尽量不要传递 props，方便在 React Router 中使用。
2. Component: 纯的无状态组件。

由于 React-Router v4 版本一直主推动态路由，所以框架中也不再使用静态路由的文件`routes.js`，把路由也当做`UI`的一部分。
同时也不再需要 layout 目录，layout 成为无状态组件。

默认引入的重要技术栈, 在用这个框架之前需要仔细阅读这些技术相对应的文档。

- Antd
- React-Router v4
- Story-Book
- React-Media
- Redux
- Saga
- Reselect
- Normalizr

## Author

**tpl-react-redux** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/tpl-react-redux/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node)
