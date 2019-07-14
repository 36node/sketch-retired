# sketch

![circle-ci][0] ![codecov][1] [![js-standard-style][2]][3]

Boilerplates for nodejs and web, including module, tcp-server, service and react etc.

## usage

```sh
npx @36node/sketch init some-folder

## then choose your template
```

## Development

```sh
yarn bootstrap
```

### we use jwt

我们准备了一个默认的`token`,可以在开发阶段使用，也可以自行生成.

`eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7InJvbGVzIjpbIkFETUlOIiwiVVNFUiJdfX0.XA1kE_UdbOsU0rfmG3g1y3SpJ5aFVzPGFBHihVXv58sNatweqLHPEUAwhqobgKgmAbaKa3dlYrXEpHESHZ7AJgQYCfSeVxtsKyoQmcq9OYA0iFcH5oCWQgYqfeWJPOroMlMdNQax5kG-GkuaFbIiwiw-9j_ACS8CSPO9Oq2dQCA`

visit [jwt.io](jwt.io) for more.

```json
{
  "sub": "session",
  "exp": 1516239022,
  "jti": "jwt id = session id",
  "user": {
    "id": "user id",
    "name": "John Doe",
    "ns": "/36node",
    "roles": ["ADMIN", "USER"]
  }
```

- sub: 该 `jwt` 的主题
- exp(expire): 过期时间
- jti: 该 JWT 的 id，这里等于 sessionId
- user: 由于是 session jwt，所以这里会有一个 user 字段，里面包含最必要的 user 信息

public key and private key in folder `./ssl`

## packages

| package name | version | download|
|---------|-----------|------------|
| browserslist-config | ![npm (scoped)](https://img.shields.io/npm/v/@36node/browserslist-config.svg) | ![npm](https://img.shields.io/npm/dm/@36node/browserslist-config.svg) |
| cli | ![npm (scoped)](https://img.shields.io/npm/v/@36node/sketch.svg) | ![npm](https://img.shields.io/npm/dm/@36node/sketch.svg)
| eslint-config | ![npm (scoped)](https://img.shields.io/npm/v/@36node/eslint-config.svg) | ![npm](https://img.shields.io/npm/dm/@36node/eslint-config.svg)
| fastman | ![npm (scoped)](https://img.shields.io/npm/v/@36node/fastman.svg) | ![npm](https://img.shields.io/npm/dm/@36node/fastman.svg)
| fetch | ![npm (scoped)](https://img.shields.io/npm/v/@36node/fetch.svg) | ![npm](https://img.shields.io/npm/dm/@36node/fetch.svg)
| koa-health | ![npm (scoped)](https://img.shields.io/npm/v/@36node/koa-health.svg) | ![npm](https://img.shields.io/npm/dm/@36node/koa-health.svg)
| koa-openapi | ![npm (scoped)](https://img.shields.io/npm/v/@36node/koa-openapi.svg) | ![npm](https://img.shields.io/npm/dm/@36node/koa-openapi.svg)
| mock-server | ![npm (scoped)](https://img.shields.io/npm/v/@36node/mock-server.svg) | ![npm](https://img.shields.io/npm/dm/@36node/mock-server.svg)
| mongoose-helper | ![npm (scoped)](https://img.shields.io/npm/v/@36node/mongoose-helper.svg) | ![npm](https://img.shields.io/npm/dm/@36node/mongoose-helper.svg)
| query-normalizr | ![npm (scoped)](https://img.shields.io/npm/v/@36node/query-normalizr.svg) | ![npm](https://img.shields.io/npm/dm/@36node/query-normalizr.svg)
| redux-api | ![npm (scoped)](https://img.shields.io/npm/v/@36node/redux-api.svg) | ![npm](https://img.shields.io/npm/dm/@36node/redux-api.svg)
| redux-cron | ![npm (scoped)](https://img.shields.io/npm/v/@36node/redux-cron.svg) | ![npm](https://img.shields.io/npm/dm/@36node/redux-cron.svg)
| redux-form | ![npm (scoped)](https://img.shields.io/npm/v/@36node/redux-form.svg) | ![npm](https://img.shields.io/npm/dm/@36node/redux-form.svg)
| redux-form-antd | ![npm (scoped)](https://img.shields.io/npm/v/@36node/redux-form-antd.svg) | ![npm](https://img.shields.io/npm/dm/@36node/redux-form-antd.svg)
| redux-ui | ![npm (scoped)](https://img.shields.io/npm/v/@36node/redux-ui.svg) | ![npm](https://img.shields.io/npm/dm/@36node/redux-ui.svg)
| redux-xlsx | ![npm (scoped)](https://img.shields.io/npm/v/@36node/redux-xlsx.svg) | ![npm](https://img.shields.io/npm/dm/@36node/redux-xlsx.svg)
| swagen | ![npm (scoped)](https://img.shields.io/npm/v/@36node/swagen.svg) | ![npm](https://img.shields.io/npm/dm/@36node/swagen.svg)
| tpl-cli | ![npm (scoped)](https://img.shields.io/npm/v/@36node/template-cli.svg) | ![npm](https://img.shields.io/npm/dm/@36node/template-cli.svg)
| tpl-cra-redux | ![npm (scoped)](https://img.shields.io/npm/v/@36node/template-cra-redux.svg) | ![npm](https://img.shields.io/npm/dm/@36node/template-cra-redux.svg)
| tpl-module | ![npm (scoped)](https://img.shields.io/npm/v/@36node/template-module.svg) | ![npm](https://img.shields.io/npm/dm/@36node/template-module.svg)
| tpl-react-component | ![npm (scoped)](https://img.shields.io/npm/v/@36node/template-react-component.svg) | ![npm](https://img.shields.io/npm/dm/@36node/template-react-component.svg)
| tpl-sdk | ![npm (scoped)](https://img.shields.io/npm/v/@36node/template-sdk.svg) | ![npm](https://img.shields.io/npm/dm/@36node/template-sdk.svg)
| tpl-service | ![npm (scoped)](https://img.shields.io/npm/v/@36node/template-service.svg) | ![npm](https://img.shields.io/npm/dm/@36node/template-service.svg)
| tpl-tcp | ![npm (scoped)](https://img.shields.io/npm/v/@36node/template-tcp.svg) | ![npm](https://img.shields.io/npm/dm/@36node/template-tcp.svg)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## RoadMap 1.0

目前打包工具的配置不太舒服，由于受到`CRA`的制约，`eslint/babel`等迫不得已使用老版本。
希望未来我们能推出自己的 scripts 来支持前端、组件、后端的打包工作。
和`react-scripts`不同的是，我们要考虑支持前端和后端的打包。

1. A scripts package like react-scripts to wrapper all things about jest/babel/eslint and the most important build etc.
2. Consider how to support more templates.
3. 考察 webpack4/5 vs rollup，统一的 build 工具。

## Author

**sketch** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/sketch/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node)

[0]: https://circleci.com/gh/36node/sketch.svg?style=svg
[1]: https://codecov.io/gh/36node/sketch/branch/master/graph/badge.svg
[2]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[3]: https://github.com/feross/standard
