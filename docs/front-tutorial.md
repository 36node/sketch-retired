# 前端技术分享

36node 团队前端技术框架

<small>Created by [@36node](https://www.36node.com) / [zzswang](https://zzswang.36node.com)</small>

---

## 页面结构

- 主层
- 弹框层
- 信息交互层

--

![层次](https://tva1.sinaimg.cn/large/006y8mN6gy1g75nhrti02j317i0u076c.jpg)

--

![主层](https://tva1.sinaimg.cn/large/006y8mN6gy1g75nx4nl2wj316m0twjsf.jpg)

---

## 技术栈

我们使用到的主要技术栈:

- React
- Redux
- Saga
- React-Router
- Antd
- Reselect

--

### sketch 基础库

- tpl-cra-redux
- redux
- redux-antd
- redux-xlsx
- ~~redux-session~~

---

## 目录结构最佳实践

```sh
src
├── actions  ## 存放 action makers
│   ├── api.js  ## api 相关 action makers
│   └── types.js ## action types
├── components ## 抽象的通用组件
├── containers ## 视图/数据/业务逻辑 组装区
│   ├── monitor
│   └── vehicle
├── lib
│   ├── history.js
│   └── index.js
```

--

```sh
├── config ## put all config, some of env
├── reducers ## root reducer
├── sagas ## root saga
├── sdk
├── selectors ## selector makers
├── app.js
├── constants.js
└── index.js
```

---

## 结合鸭子模式

- 在 container 中，具象化 action、selector 以及如果需要用到 saga taps。
- 某个 container 文件夹里，尽量包含这个业务相关所有具体实例化代码。
- 抽象层封装在对应的 目录里。大量的 redux 套件已经准备好了。

---

## 例子

以 toggle 和 api 为例，展示如何实践分类模式(redux 社区推荐)和鸭子模式(dva 推荐)

---

## Toggle

Toggle usually works as a swither, open or close.

--

### Toggle Action

```js
import { makeToggle } from "@36node/redux";

const toggle = makeToggle("someKey");

// switch to true or false
dispath(toggle());
// switch to true
dispath(toggle(true));
// switch to false
dispath(toggle(false));
```

--

### Toggle Reducer

```js
import { toggleReducerRoot } from "@36node/redux";

export default combineReducers({
  ...toggleReducerRoot,
});
```

--

### Toggle Selector

```js
import { makeToggleSelector } from "@36node/redux";

// selector maker
const select = makeToggleSelector("someKey");
const some = select(state);
```

---

## Api

Redux-api is a library which can easily write client to communicate with backends. It generates actions and selectors for making ajax calls to API endpoint. Also, it use saga to change ajax state and save result in redux store with few config.

--

### Api Actions

createApiMaker: It is a creator of api actions maker.

```js
import { createApiMaker, makeApiTypes } from "@36node/redux";

const STORE_LIST_PETS = makeApiTypes("STORE_LIST_PETS");
const makeListPets = createApiMaker(
  STORE_LIST_PETS,
  sdk.petstore.pet.listPets,
  [petSchema]
);

const listPets = makeListPets("someKey");
// list pets from service
dispatch(listPets({ query: {} }));
```

--

```js
const resetSome = makeApiReset("someKey);
// reset the key with init state
dispatch(resetSome());
```

--

### Api Reducer

```js
import { apiReducerRoot } from "@36node/redux";

export default combineReducers({
  ...apiReducerRoot,
});
```

--

### Api Selector

```js
import { makeApiSelector } from "@36node/redux";

const select = makeApiSelector("someKey");
const some = select(state);
```

--

### Api Saga

`redux/api` should use with saga.

```js
import { fork, all } from "redux-saga/effects";
import { watchApi } from "@36node/redux";

export default function* root() {
  yield all([fork(watchApi)]);
}
```

---

## 更多文档

- [@36node/sketch](https://github.com/36node/sketch/blob/master/README.md)
- [@36node/redux](../packages/redux/README.md)
- [@36node/redux-antd](../packages/redux-antd/README.md)
- [@36node/redux-xlsx](../packages/redux-xlsx/README.md)

tpl-cra-redux 是 36node-react 最佳实践的例子
