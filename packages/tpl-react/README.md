# @36node/template-react-redux
[![version][0]][1] [![downloads][2]][3]

## Usage

1.  `yarn install`
2.  dev: `yarn start`
3.  build: `yarn build`

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## circle-ci

需要在 circle-ci 配置的环境变量有

DOCKER_USER: docker hub 用户名
DOCKER_PASS: docker hub 密码
DOCKER_REGISTRY: docker hub 地址

## Mock Server

Tpl-react has integrated [json-server](https://github.com/typicode/json-server) into webpack-dev-server for testing your app, you can generate mock data and config mock server through mock.js under root path.

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

## Author

**tpl-react** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/tpl-react/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node)

[0]: https://img.shields.io/npm/v/@36node/template-react-redux.svg?style=flat
[1]: https://npmjs.com/package/@36node/template-react-redux
[2]: https://img.shields.io/npm/dm/@36node/template-react-redux.svg?style=flat
[3]: https://npmjs.com/package/@36node/template-react-redux
