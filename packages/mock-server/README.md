# @36node/mock-server

mock-server 基于 json-server， 为了更好的提供数据 mock 服务.

## Install

```bash
$ yarn install @36node/mock-server
```

## Use

### 1. 在 Nodejs 中使用

```js
#!/usr/bin/env node

const mockServer = require("@36node/mock-server");

const app = mockServer({
  db: {
    pets: [
      { id: 1, name: "kitty", tag: "CAT", grade: 3 },
      { id: 2, name: "pi", tag: "DOG", grade: 4 },
    ],
  },
  rewrites: {
    "/store/pets*": "/pets$1",
  },
  routers: [], // custom middle ware
  aggregations: {
    "/pets": {
      grade: records => _.sumBy(records, "grade") / records.length,
      count: records => records.length,
    },
  },
});

app.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
```

### 2. 在 webpack develop server 中使用

使用 react-app-rewired 时， 通过 config-overwrites.js 文件 配置 devServer

```js
const stopMock = process.env.MOCK === "false" || process.env.MOCK === "FALSE";
const defaultServerOpts = { delay: 500 };
const {
  serverOpts = defaultServerOpts,
  db: {
    pets: [
      { id: 1, name: "kitty", tag: "CAT", grade: 3 },
      { id: 2, name: "pi", tag: "DOG", grade: 4 },
    ],
  },
  rewrites: {
    "/store/pets*": "/pets$1",
  },
  routers: [], // custom middle ware
  aggregations: {
    "/pets": {
      grade: records => _.sumBy(records, "grade") / records.length,
      count: records => records.length,
    },
  },
} = someMockConfig;

const mockServer = require("@36node/mock-server");

module.exports = {
  ...otherConfig,

  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      if (stopMock) {
        return config;
      }

      /**
       * mock server hoc
       * @param {Express.Application} app
       */
      function configMock(app) {
        // 根据 请求的 header.accept 的类型决定是正常渲染，还是进入mock-server
        const shouldMockReq = req => {
          return (
            req.method !== "GET" ||
            (req.headers.accept &&
              req.headers.accept.indexOf("application/json") !== -1)
          );
        };

        if (serverOpts.delay) {
          app.use((req, res, next) => {
            if (shouldMockReq(req)) {
              return pause(serverOpts.delay)(req, res, next);
            }
            return next();
          });
        }

        mockServer({ app, db, rewrites, routers, shouldMockReq });

        return app;
      }

      const prev = config.before;

      config.before = compose(
        configMock,
        app => {
          prev(app);
          return app;
        }
      );

      return config;
    };
  },
};
```

## Api

mockServer(opts)

params:

1. opts: Object

   db: // 同 json-server 的 db 配置 https://github.com/typicode/json-server#getting-started

   rewrites (Optional): 同 json-server https://github.com/typicode/json-server#rewriter-example

   routes (Optional): [Express.Middleware] 同 json-server custom-middle https://github.com/typicode/json-server#add-middlewares

   aggregations (Optional): Object 见下文 Aggregation

   app (Optional): Express.Application, 如果没有则自动新建

   shouldMock (Optional): (req, res) => Boolean, 判断 request 是否使用 mock-server 的 中间件

返回：Express.Appliction

## Array

使用标准 url query 格式传递数组数据

```curl
a=1&a=2
```

## Filter

Use `.` to access deep properties

```curl
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode
```

## Paginate

Use `_offset` and optionally `_limit` to paginate returned data. (an `X-Total-Count` header is included in the response)

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.

```curl
GET /posts?_offset=10
GET /posts?_offset=7&_limit=20
```

note: _10 items are returned by default_

## Sort

Add `_sort` and `_order` (ascending order by default)

```curl
# asc
GET /posts?_sort=views

# desc
GET /posts/1/comments?_sort=-votes
```

note: _list posts by views ascending order and comments by votes descending order_

For multiple fields, use the following format:

```curl
GET /posts/1/comments?_sort=-votes&_sort=likes
```

\_prefixing a path with `-` will flag that sort is descending order.
When a path does not have the `-` prefix, it is ascending order.

## Operators

Add `_gt`, `_lt`, `_gte` or `_lte` for getting a range

```curl
GET /posts?views_gte=10&views_lte=20
```

Add `_ne` to exclude a value

```curl
GET /posts?id_ne=1
```

Add `_like` to filter (RegExp supported)

`_like` support array

```curl
GET /posts?title_like=server
```

## Select

Specifies which document fields to include or exclude

```curl
GET /posts?_select=title&_select=body
GET /posts?_select=-comments&_select=-views
```

or

```curl
_select=title,body
```

_prefixing a path with `-` will flag that path as excluded._
_When a path does not have the `-` prefix, it is included_
_A projection must be either inclusive or exclusive._
_In other words, you must either list the fields to include (which excludes all others),_
_or list the fields to exclude (which implies all other fields are included)._

## Aggregation

聚合的 query 请求。聚合请求通过 \_group 和 \_select 参数来控制，通过 opts.aggregations 配置:

比如对于一个 db 配置:

```js
const faker = require("faker");
const _ = require("lodash");
const moment = require("moment");

const now = moment();

const generate = count =>
  _.range(count).map((val, index) => {
    const birthAt = faker.date.between(
      moment()
        .subtract(10, "year")
        .toDate(),
      moment()
        .subtract(1, "year")
        .toDate()
    );

    const age = now.diff(moment(birthAt), "year");

    return {
      id: faker.random.uuid(), // pet id
      name: faker.name.lastName(), // pet name
      tag: faker.random.arrayElement(["CAT", "DOG"]), // pet tag
      owner: faker.name.firstName(), // pet owner
      grade: faker.random.number({ min: 1, max: 5 }), // pet grade
      age, // pet age
      birthAt: birthAt.toISOString(), // pet birth time
    };
  });

const db = {
  pets: generate(100),
};
```

其中包括了 100 个 pets 的 mock 数据，可使用的路由有：

```
GET    /pets
GET    /pets/{petId}
POST   /pets
PUT    /pets/{petId}
PATCH  /pets/{petId}
DELETE /pets/{petId}
```

聚合只在 `GET /pets` 中有效

### 简单分组

如果需要统计 pets 中猫和狗的数量, 可以对 tag 分组

配置 aggregations 参数

```js
  aggregations: {
    "/pets": {
      // records 是分组后的数据集合
      count: records => records.length,
      // 默认支持 两种聚合简写 求和 'sum' 和 平均 ‘avg'
      grade: 'avg',
    },
  },
```

请求:

```
GET /pets?_group=tag
```

结果:

```json
[
  {
    "id": "tag=CAT",
    "tag": "CAT",
    "grade": 3.017857142857143,
    "count": 56
  },
  {
    "id": "tag=DOG",
    "tag": "DOG",
    "grade": 3.3863636363636362,
    "count": 44
  }
]
```

### 按时间粒度分组

如果需要统计每个月分别生了多少猫和狗, 可以按 tag 和 birthAt.month 分组

对于时间的分组条件，可以采用不同粒度进行分组，query 的格式为 `birthAt.month` 表示在 birthAt 字段上 按照 月粒度进行分组。

支持的粒度包括:

```js
[
  "year", // 年
  "quarter", // 季度
  "month", // 月
  "week", // 星期
  "isoWeek", // iso 星期
  "day", // 天
  "hour", // 小时
  "min", // 分钟
  "second", // 秒
];
```

请求:

```
GET /pets?_group=tag&_group=birthAt.month
```

结果:

```json
[
  ...,
  {
    "id": "tag=CAT&birthAt=2012-12-31T16%3A00%3A00.000Z",
    "tag": "CAT",
    "birthAt": "2012-12-31T16:00:00.000Z",
    "count": 6
  },
  {
    "id": "tag=DOG&birthAt=2014-12-31T16%3A00%3A00.000Z",
    "tag": "DOG",
    "birthAt": "2014-12-31T16:00:00.000Z",
    "count": 7
  }
]
```

Tips:

1. 在返回结果中，birthAt 当前月的起始时间（UTC），如果使用其他粒度，则类似。
2. 如果同时传入统一字段的多个时间粒度，比如 `_group=birthAt.year&_group=birthAt.month`, 则较小的时间粒度(month)会生效.
