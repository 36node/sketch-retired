# sketch

Boilerplates for nodejs and web, including module, tcp-server, service and react etc.

## Install

```sh
## use this command for upgrade too

yarn global add @36node/sketch-cli
```

## usage

```sh
sketch init some-folder

## then choose your template
```

## Development

```sh
yarn bootstrap
```

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
