# @36node/template-cra-redux

[![version][0]][1] [![downloads][2]][3]

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

## 前端开发指南

note: _这段写起来难度有点大，先用中文写_

```sh
yarn styleguide
```

会打开 styleguide 界面，专门用于组件开发

### 基本哲学

在`Redux`的参与下，我们需要把组件分成两种类型：

1. Container: 带状态的组件，通过 connect 将属性直接注入到组件中。外面调用这个组件的时候，尽量不要传递 props，方便在 React Router 中使用。
2. Component: 纯的无状态组件。

由于 React-Router v4 版本一直主推动态路由，所以框架中也不再使用静态路由的文件`routes.js`，把路由也当做`UI`的一部分。
同时也不再需要 layout 目录，layout 成为无状态组件。

默认引入的重要技术栈, 在用这个框架之前需要仔细阅读这些技术相对应的文档。

- Antd
- React-Router v4
- Style Guide
- React-Media
- Redux
- Saga
- Reselect
- Normalizr

### source 目录最佳实践

```sh
src
├── actions
├── components
├── containers
│   ├── history
│   ├── monitor
│   └── vehicle
├── lib
├── reducers
├── sagas
├── sdk
├── selectors
├── app.js
├── config.js
├── constants.js
├── history.js
└── index.js
```

说是最佳实践，也不一定的，只是这么多项目做下来后形成的一个共识，然后目前其实也还有收到很多建议，有好的建议也可以建立一个 issue 来讨论。
现在这个结构可能是当下工程最合适。

工程目录结构分类大体上有两种模式。

1. 鸭子模式: 这个模式下把 UI action store 等文件放在一起，组织成类似一个 modules/xxx 的文件夹。这个模式的好处是结构比较简单明了，容易找到对应修改的地方。缺点是容易有重复代码，为了避免 action type 冲突，需要有一些特殊的结构来避免。例如 dva 的 model 模式。
2. 分类模式: 这个模式下按照代码的类别进行归类组织，相同的行为抽象成类别代码放在一起。优点是代码会高度复用，缺点是抽象程度高代码不容易理解，找不到位置。这种模式是 redux 社区推荐的最佳实践。

目前为了追求代码的极致简约，采用了第二种分类模式。为了让大家更好的组织代码，分别介绍一下各个目录的用途和理念。

`ps: 个人认为或许融合1和2是框架下一个版本的发展方向`

#### actions

这里面存放的是 Redux Action 的 creator，调用对应的函数就会生成一个 Action 声明。Action 就像一个契约，贯穿着整个系统，各个部分都会根据契约来执行对应的代码。
为了避免同一个文件过于膨胀，建议将 actions 按业务逻辑进行分类。

```sh
index.js    ## 对各个部分进行索引，统一输出
history.js  ## 历史查询
monitor.js  ## 监控部分
vehicle.js  ## 车辆详情
global.js   ## 公共的 action
```

#### components

这里存放各个无状态组件, 每个组件一个文件夹。组件内包含

- 代码文件
- 样式尽量通过 styled 来封装，如果实在需要 less 或者 css，也可以放在文件夹内部
- xxx.test.js 单元测试
- 单元测试的 snapshot
- 如果是一个复杂组件，需要用数据来辅助测试，那么单独建立一个数据文件 fixtures.js

无状态对一个组件来说是十分重要的，如果确实存在一些行为只在组件内部起作用，可以考虑做成非受控组件，或者用 uncontrollable 组件来包装。

#### containers

这里存放都是有状态的组件，或者叫视图。
可以是一个页面，或者一个页面中的一部分。建议尽量切割的细一些，不用害怕数据交互。咱们这个模式最擅长做的就是数据交互。
视图中只有数据和根据数据展示的逻辑，并不应该包含副作用，以及副作用的处理。
例如 异步操作、api 等待等、 csv 文件导出、声音播放这些都可以放到 saga 中，如果在组件中，会遇到不可描述的坑，例如声音可能会二重放。

目录按照视图的业务逻辑来区分，一个业务逻辑一个目录

```sh
history   ## 历史查询
monitor   ## 监控部分
vehicle   ## 车辆详情
equipment ## 终端管理
```

每个 container 文件不要太长，太长意味着咱们可以拆分它了。`container` 往往会引用 `actions` 和 `selectors` 文件。

#### lib

公共的函数库，纯函数，纯纯的，不要放其它东西，尽量和业务逻辑无关。

#### reducers

Redux 的心脏部分，为数据流动提供动力。这个目录是整个架构最核心，也最能体现高度抽象的地方。

```sh
src/reducers
├── entity.js
├── fetching.js
├── form.js
├── index.js
├── paginate.js
├── select.js
├── setting.js
└── toggle.js
```

index.js 是 reducer root，所有的 reducer 最终在这里汇合。

其它文件往往是 reducer 的 creator，抽象程度比较高，也方便去引用其它现成的 reducer 组件，例如 redux-form。

对应 store 里的 state，会发现我们是按分类进行组织的，和上述的 reducer 目录类似

```sh
session     ## 会话
entities    ## 实际数据存放位置
paginators  ## 分页
fetchings   ## 不分页
selectings  ## 选择器
toggles     ## 开关
```

新增加的 reducer 也应该按照这个逻辑组织。 一个 `state` 叶子节点往往和某个 `action` 相关，所以这里推荐之间用 `action.type` 作为 `key` 来存储。

#### sagas

这里存放所有的副作用以及副作用发生器。

和 `reducer` 的逻辑类似，这里 `index.js` 是根，其它文件是按分类抽象的 `saga creator` 代码。

#### sdk

这个目录是自动根据 `openapi.yaml` 生成的，带语法提示，支持 ts 的编辑器都会有自动的语法提示。

#### selectors

这里面存放的是纯函数，每个 selector 封装了从 store 中获取数据的方法和业务逻辑。
为了避免同一个文件过于膨胀，按业务逻辑进行分类。

```sh
index.js    ## 对各个部分进行索引，统一输出
history.js  ## 历史查询
monitor.js  ## 监控部分
vehicle.js  ## 车辆详情
global.js   ## 公共的 selectors
```

#### 根目录文件

- app.js: 应用总入口，跟路由和 `layout` 在这里
- config.js: 环境变量
- constants.js: 这里保存全局使用的常量，如果非全局使用的常量建议再对应的文件内部定义
- history.js: 前端路由采用的 history 封装
- index.js: 启动入口，PWA 在此。

constants 文件中存放必要的全局常量，例如 action type 以及 state 节点等。放常量的一个好处是，可以全局重命名，第二是防止冲突，不会存在随便使用 string 的情况。
可以根据类别对常量进行分类，例如:

```js
export const MONITOR = {
  LIST_VEHICLES: "MONITOR_LIST_VEHICLES",
};
```

constants 建议按照业务模块进行区域划分，可以用注释符号等区分不同业务所使用的常量。

只要不重复，名称尽量短。

翻译等文字应该放在 i18n 类似的文件里。

### 生产环境调试

** 前方高能，注意安全 **

修改 .env 文件里的几个 `BASE` 路径为线上地址

```sh
REACT_APP_STORE_BASE=https://api.36node.com/petstore/v0
```

### 容器化部署配置

通过 Docker 镜像部署时，添加环境变量

```sh
REACT_APP_STORE_BASE=https://api.36node.com/petstore/v0
```

将覆盖编译时的 REACT_APP_STORE_BASE 配置。

## Author

**template-react-redux** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/template-react-redux/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node)

[0]: https://img.shields.io/npm/v/@36node/template-cra-redux.svg?style=flat
[1]: https://npmjs.com/package/@36node/template-cra-redux
[2]: https://img.shields.io/npm/dm/@36node/template-cra-redux.svg?style=flat
[3]: https://npmjs.com/package/@36node/template-cra-redux
