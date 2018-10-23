# query-normalizr

[![NPM version](https://img.shields.io/npm/v/query-normalizr.svg?style=flat)](https://npmjs.com/package/query-normalizr)
[![NPM downloads](https://img.shields.io/npm/dm/query-normalizr.svg?style=flat)](https://npmjs.com/package/query-normalizr)
[![CircleCI](https://circleci.com/gh/36node/query-normalizr/tree/master.svg?style=shield)](https://circleci.com/gh/36node/query-normalizr/tree/master)
[![codecov](https://codecov.io/gh/36node/query-normalizr/branch/master/graph/badge.svg)](https://codecov.io/gh/36node/query-normalizr)
[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/36node/donate)

query-normalizr 的作用: 将 url 中的 query 规则化成方便 service 层调用的数据格式。

我们定义了:

1.  [标准的 query in url 格式](../tpl-service/README.md##QueryInRoute).
2.  [标准的 service 层 Query 数据格式](../tpl-service/README.md##QueryInService).

## Install

```bash
yarn add query-normalizr
```

## Usage

```js
import normalizr from "@36node/query-normalizr";

// koa app
app.use(normalizr(options));
```

## API

```js
normalizr(options);
```

return koa middleware

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

**query-normalizr** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/query-normalizr/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node) · Twitter [@y](https://twitter.com/y)
