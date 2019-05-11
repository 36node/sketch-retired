# @36node/template-service

[![version][0]][1] [![downloads][2]][3]

## Development

```sh
# prepare service with docker
docker-compose -d

# install dependencies
yarn

# start service
yarn start

# if we want to start service as production
NODE_ENV=production yarn start

# use postman to check api
```

### Folder structures

```sh
bin
./src
├── api
├── app.js
├── config.js
├── es-client.js
├── index.js
├── kafka-client.js
├── lib
├── models
└── services
```

- bin: 受限于nodejs的原生能力限制，该目录下要求采用 commonjs 写法; bin 目录用于辅助项目执行。
- src: source 目录只负责输出模块。
- api: 自动生成的 api 目录包含 koa 桩代码
- app.js: 应用程序入口
- config.js: 配置文件入口
- es-client.js: es 的 client 配置
- index.js: 程序 main
- kafka-client.js: kafka 的配置
- lib: 基础库
- models: 数据层
- service: 逻辑层

目录引用原则：

- config 文件是唯一的例外
- services and tasks 引用 models
- lib 目录可以被任何文件引用
- lib 目录内部不要出现交叉引用

### default token

`eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7InJvbGVzIjpbIkFETUlOIiwiVVNFUiJdfX0.XA1kE_UdbOsU0rfmG3g1y3SpJ5aFVzPGFBHihVXv58sNatweqLHPEUAwhqobgKgmAbaKa3dlYrXEpHESHZ7AJgQYCfSeVxtsKyoQmcq9OYA0iFcH5oCWQgYqfeWJPOroMlMdNQax5kG-GkuaFbIiwiw-9j_ACS8CSPO9Oq2dQCA`

visit [jwt.io](jwt.io) for more.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "user": {
    "roles": ["ADMIN", "USER"]
  }
}
```

### postman

```sh
# 安装 fastman
yarn global add @36node/fastman

# You can get your key from the [integrations dashboard](https://go.postman.co/integrations/services/pm_pro_api)
fastman config -a <your-postman-api-key>

# list all your collections in your postman
fastman ls

# import file into postman
fastman import ./postman_collection.json

# export file from postman
fastman export "Shanghaibus Core API" ./postman_collection.json
```

postman 里至少设置如下两套环境, 具体变量值根据你的实际情况来。

`development`

```js
{
  host: "http://localhost:3000/shanghaibus/core/v0",
  token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7InJvbGVzIjpbIkFETUlOIiwiVVNFUiJdfX0.XA1kE_UdbOsU0rfmG3g1y3SpJ5aFVzPGFBHihVXv58sNatweqLHPEUAwhqobgKgmAbaKa3dlYrXEpHESHZ7AJgQYCfSeVxtsKyoQmcq9OYA0iFcH5oCWQgYqfeWJPOroMlMdNQax5kG-GkuaFbIiwiw-9j_ACS8CSPO9Oq2dQCA"
}
```

`production`

```js
{
  host: "https/api.36node.com/shanghaibus/core/v0",
  token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7InJvbGVzIjpbIkFETUlOIiwiVVNFUiJdfX0.XA1kE_UdbOsU0rfmG3g1y3SpJ5aFVzPGFBHihVXv58sNatweqLHPEUAwhqobgKgmAbaKa3dlYrXEpHESHZ7AJgQYCfSeVxtsKyoQmcq9OYA0iFcH5oCWQgYqfeWJPOroMlMdNQax5kG-GkuaFbIiwiw-9j_ACS8CSPO9Oq2dQCA"
}
```

## Url Pattern

Find more in [@36node/sketch/docs/url.md](https://github.com/36node/sketch/blob/master/docs/url.md)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/something`
3. Commit your changes: `git commit -am 'feat: something'`
4. Push to the branch: `git push -u origin feature/something`
5. Submit a pull request :D

## Author

**tpl-service** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.
Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/tpl-service/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node)

[0]: https://img.shields.io/npm/v/@36node/template-service.svg?style=flat
[1]: https://npmjs.com/package/@36node/template-service
[2]: https://img.shields.io/npm/dm/@36node/template-service.svg?style=flat
[3]: https://npmjs.com/package/@36node/template-service
