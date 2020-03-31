export const SESSION_ID = "session_id";
export const TOKEN = "token";
export const LOGIN_URL = "/login";

/**
 * 理解这部分需要先阅读 redux 社区推荐的 state 基本结构
 * https://www.redux.org.cn/docs/recipes/reducers/BasicReducerStructure.html
 *
 * redux 社区将前端状态分为 `领域数据`、`应用状态`和`UI 状态`
 * 在我们的实践中，`领域数据`通过 normalizr 保存到了 state.entities 节点中，剩下的索引数据放到了 api 或者 ws 和后端状态相关的节点中
 * 这部分索引数据在本质上和`应用状态`相同，成为后端数据状态和前端`领域数据`的桥梁
 * 因此我们用 domain 来统一`领域数据`和`应用状态`。
 *
 * 这里的 domain 有点类似 dva 的 model 概念，是领域和应用的集合，是抛开界面，应用底层的数据视图抽象。
 *
 * 应用状态为什么可以和领域数据合并在一个节点中。
 * 1. 应用状态本质上是领域数据在前端展现时需要的状态。
 * 2. 应用状态本身可以升级为领域。例如下方的 `store.exporter`，它本质上是对领域 `store.exporter` 中的pets列表数据的一个补充。
 *
 * UI状态 将分散在各个 container 中自行解决，通常大部分 `UI 状态`是不需要跨 container 共享的。
 * 通常需要共享的部分，应该是`应用状态`或者`领域数据`，这部分都将在 domain 中共享。
 * 剩下的 `UI 状态` 可以通过文件引用来实现局部共享。
 * 大部分情况下，`UI 状态`可以直接用字符串常量，因为通常互相不会影响.
 *
 * 一定要注意 Domain 不是按照页面结构划分的，而是按照应用状态和领域数据划分的，因此建议统一放到 constants 中，便于对整体应用的数据层次一目了然.
 * 原则就是仔细思考，这些结构应该是比较稳定的。
 */
export const domain = {
  github: {
    repos: "github.repos",
    exporter: "github.exporter",
  },
  store: {
    pets: "store.pets",
    importer: "store.importer",
    exporter: "store.exporter",
    progress: "store.progress",
    refresh: "store.refresh",
  },
  session: "session",
  message: {
    todos: "message.todos",
    unread: "message.unread",
    events: "message.events",
  },
};
