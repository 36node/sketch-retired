# @36node/template-service

[![version][0]][1] [![downloads][2]][3]

## Development

```sh
# prepare service with docker
docker-compose -d

# install dependencies
yarn bootstrap

# start service
yarn start

# use postman to check api
```

### Folder structures

```sh
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

- api: 自动生成的 api 目录包含 koa 桩代码
- app.js: 应用程序入口
- config.js: 配置文件入口
- es-client.js: es 的 client 配置
- index.js: 程序 main
- kafka-client.js: kafka 的配置
- lib: 基础库
- models: 数据层
- service: 逻辑层

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

## Route Pattern

We would suggest api route pattern use following patterns.

### Plural routes

```curl
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1
```

### Singular routes

```curl
GET    /profile
POST   /profile
PUT    /profile
PATCH  /profile
```

## Query In Route

### Array

we use standard url query format to pass array data.

```curl
a=1&a=2
```

### Filter

Use `.` to access deep properties

```curl
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode
```

### Paginate

Use `_page` and optionally `_size` to paginate returned data.

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.

```curl
GET /posts?_page=7
GET /posts?_page=7&_size=20
```

note: _10 items are returned by default_

### Sort

Add `_sort` (ascending order by default, `-` before field means descending)

```curl
GET /posts?_sort=views
GET /posts/1/comments?_sort=votes
```

For multiple fields, use the following format:

```curl
GET /posts?_sort=-publishAt&_sort=views
```

note: _list posts by publishAt descending order and views ascending order_

### Slice

Add `_limit` and optionally `_offset` (an `X-Total-Count` header is included in the response).
`_offset` means how many documents will be skipped.

```curl
GET /posts?_limit=20&_offset=10
```

note: _if we count start from 1, then above return element 11 ~ 30_

### Operators

Add `_gt`, `_lt`, `_gte` or `_lte` for getting a range

```curl
GET /posts?views_gte=10&views_lte=20
```

Add `_ne` to exclude a value

```curl
GET /posts?id_ne=1
```

Add `_like` to filter (RegExp supported)

```curl
GET /posts?title_like=server
```

### Array wildcard

If a field is an array, like:

1. `assignees=*` means assignees has at least one member.
2. `assignees=none` means assignees is an empty array.

### Full-text search

Add `q`

```curl
GET /posts?q=internet
```

### Relationships

To expend the relational resource, add `_populate`

```curl
GET /posts?_populate=comments
GET /posts/1?_populate=comments
GET /comments?_populate=post&_populate=createdBy
GET /comments/1?_populate=post
```

To get or create nested resources

```curl
GET  /posts/1/comments
POST /posts/1/comments
```

### Select

Specifies which document fields to include or exclude

```curl
GET /posts?_select=title&_select=body
GET /posts?_select=-comments&_select=-views
```

or

```curl
_select=title,body
```

_prefixing a path with `-` will flag that path as excluded.
When a path does not have the `-` prefix, it is included_
A projection must be either inclusive or exclusive.
In other words, you must either list the fields to include (which excludes all others),
or list the fields to exclude (which implies all other fields are included).

## Query In Service

```js
{
  size: 100,
  page: 1,  // page 从 1 开始定义
  limit: 10,
  offset: 10,
  sort: "-createdBy", // if array should be: ["-createdBy", "views"]
  select: ["views", "body"], // if single should be: "views"
  populate: "author",
  filter: {
    age: {
      $lt: 10,  // age_lt
      $gt: 5,   // age_gt
    },
    tag: {
      $ne: "pretty",  // tag_ne
    },
    name: "sherry",
    title: {
      $regex: /^hello .* world$/i,  // like
    },
    assignees: { $ne: [] }, // *
    followers: { $eq: [] }, // none
    $text: { $search: "hello" },  // q
  }
}
```

- 其中非 `_` 开头的字段都将放到 filter property 下面。

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
