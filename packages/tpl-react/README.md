# tpl-react

[![NPM version](https://img.shields.io/npm/v/tpl-react.svg?style=flat)](https://npmjs.com/package/tpl-react)
[![NPM downloads](https://img.shields.io/npm/dm/tpl-react.svg?style=flat)](https://npmjs.com/package/tpl-react)

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

If you want to test against local mock server, run following script before `yarn start` :

```sh
yarn mock
```

It will run a docker for you. And add environment in `.env` file.

```sh
STORE_BASE=http://localhost:8000/petstore/v0
```

## Author

**tpl-react** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/tpl-react/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node)
