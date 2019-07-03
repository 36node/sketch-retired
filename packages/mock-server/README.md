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


// db: 同json-server https://github.com/typicode/json-server#getting-started
// rewrites: 同json-server https://github.com/typicode/json-server#rewriter-example
// routes: 同json-server custom-middle https://github.com/typicode/json-server#add-middlewares
const app = mockServer({ db = {}, rewrites = {}, routers = [] });

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
  db = {},
  rewrites = {},
  routers = [],
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

参数:

1. opts: Object

   db: // 同 json-server 的 db 配置 https://github.com/typicode/json-server#getting-started

   rewrites (Optional): 同 json-server https://github.com/typicode/json-server#rewriter-example

   routes (Optional): [Express.Middleware] 同 json-server custom-middle https://github.com/typicode/json-server#add-middlewares

   aggregations (Optional): Object 见下文 Aggregation

   app (Optional): Express.Application, 如果没有则自动新建

   shouldMock (Optional): (req, res) => Boolean, 判断 request 是否使用 mock-server 的 中间件

返回：Express.Appliction

## Aggregation

除了使用 json-server 中提供的 [query](https://github.com/typicode/json-server#routes) 条件, 新增加了聚合的 query 请求。聚合请求通过 \_group 和 \_select 参数来控制，通过 opts.aggregations 配置:

    聚合计算发生在 其他 query 之后， 比如 如果传入 _limit, _offset, filters,  等， 则会先对数据进行筛选，然后在筛选结果中做聚合。

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

如果需要统计 pets 中猫和狗的数量, 可以对 tag 分组，默认会统计不同 tag 分组的 \_count

请求:

```
GET /pets?_group=tag
```

结果:

```json
[
  {
    "tag": "CAT",
    "_count": 56
  },
  {
    "tag": "DOG",
    "_count": 44
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
  {
    "tag": "CAT",
    "birthAt": "2017-08-31T16:00:00.000Z",
    "_count": 2
  },
  {
    "tag": "DOG",
    "birthAt": "2013-02-28T16:00:00.000Z",
    "_count": 1
  },
  ...
]
```

Tips:

1. 在返回结果中，birthAt 当前月的起始时间（UTC），如果使用其他粒度，则类似。
2. 如果同时传入统一字段的多个时间粒度，比如 `_group=birthAt.year&_group=birthAt.month`, 则较小的时间粒度(month)会生效.

### 聚合字段

如果需要统计 猫和狗的总评分, 则可使用 \_select 请求：

请求:

```
GET /pets?_group=tag&_select=grade
```

结果:

```json
[
  {
    "tag": "CAT",
    "_count": 56,
    "grade": 172
  },
  {
    "tag": "DOG",
    "_count": 44,
    "grade": 148
  }
]
```

Tips:

默认的聚合是求和

### 自定义聚合方法

如果需要统计 不同出生年份的 毛和狗的平均分，则需要：

1. 在 MockServer opts 中配置 aggregations:

```js
  aggregations: {
    "/pets": { // 需要使用rewites 之前的路径， 比如 配置了 "/petstore/pets*":"/pets$1", 则仍需配置 /pets
      grade: "avg", // grade 的聚合使用求平均值
    },
  },
```

2. 请求：

```
GET /pets?_group=tag&_group=birthAt.year&_select=grade
```

3. 结果

```json
[
  {
    "tag": "CAT",
    "birthAt": "2008-12-31T16:00:00.000Z",
    "_count": 4,
    "grade": 3.75
  },
  {
    "tag": "CAT",
    "birthAt": "2009-12-31T16:00:00.000Z",
    "_count": 10,
    "grade": 3.4
  },
  ...
]
```

Tips:

1. 系统默认支持两种聚合方式 sum 和 avg
2. 也可自定义聚合函数：

```js
  aggregations: {
    "/pets": { // 需要使用rewites 之前的路径， 比如 配置了 "/petstore/pets*":"/pets$1", 则仍需配置 /pets
      grade: records => _.sumBy(records, 'grade') / records.length, // grade 的聚合使用求平均值
    },
  },
```
