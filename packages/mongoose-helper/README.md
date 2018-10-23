# mongoose-helper

[![NPM version](https://img.shields.io/npm/v/mongoose-helper.svg?style=flat)](https://npmjs.com/package/mongoose-helper)
[![NPM downloads](https://img.shields.io/npm/dm/mongoose-helper.svg?style=flat)](https://npmjs.com/package/mongoose-helper)
[![CircleCI](https://circleci.com/gh/36node/mongoose-helper/tree/master.svg?style=shield)](https://circleci.com/gh/36node/mongoose-helper/tree/master)
[![codecov](https://codecov.io/gh/36node/mongoose-helper/branch/master/graph/badge.svg)](https://codecov.io/gh/36node/mongoose-helper)
[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/36node/donate)

mongoose-helper 提供标准的 mongoose 方法。

我们定义了:

1.  [标准的 query in url 格式](../tpl-service/README.md##QueryInRoute).
2.  [标准的 service 层 Query 数据格式](../tpl-service/README.md##QueryInService).

mongoose-helper 的 `list` 方法中将会进一步将 `QueryInService` 转成成适合 mongoose 查询的语法。

## Install

```bash
yarn add mongoose-helper
```

## Usage

```js
import helper from ("mongoose-helper");

// mongoose schema
schema.plugin(helper, options);
```

## Query Standard

我们制定了一套前端的 query 语法标准。请参考：

[Read the document of tpl-service.](../tpl-service/README.md##Routes)

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

**mongoose-helper** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/mongoose-helper/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node)
