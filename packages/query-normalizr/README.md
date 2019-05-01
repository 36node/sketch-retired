# @36node/query-normalizr

[![version][0]][1] [![downloads][2]][3]

query-normalizr 的作用: 将 url 中的 query 规则化成方便 sdk 和 service 层调用的数据格式。

## Install

```bash
yarn add @36node/query-normalizr
```

## Usage

```js
import { QueryNormalizr } from "@36node/query-normalizr";

// koa app
app.use(normalizr(QueryNormalizr));
```

## API

### middleware

```js
normalizr(options);

// return koa middleware
```

### normalize

```js
import { normalize } from "@36node/query-normalizr";
import qs from "query-string";

const queryStr =
  " _expand=department&_group=type&_limit=10&_offset=0&_populate=user&_select=name&_select=age&_sort=updatedAt&_sort=-createdAt&age_gt=10&age_lt=20&level_gte=10&level_lte=20&plate_like=沪A&tag_ne=pretty&title_like=hello&type=test1&type=test2";

normalize(qs.parse(queryStr));

/*
return {
  limit: 10,
  offset: 0,
  sort: ["updatedAt", "-createdAt"],
  populate: "user",
  select: ["name", "age"],
  group: "type",
  filter: {
    age: {
      $gt: "10",
      $lt: "20",
    },
    level: {
      $gte: "10",
      $lte: "20",
    },
    plate: {
      $regex: {},
    },
    tag: {
      $ne: "pretty",
    },
    title: {
      $regex: {},
    },
    type: ["test1", "test2"]
  },
  _expand: "department",
};
*/
```

### denormalize

```js
import { denormalize } from "@36node/query-normalizr";
import qs from "query-string";

const queryObj = {
  limit: 10,
  offset: 0,
  sort: ["updatedAt", "-createdAt"],
  populate: "user",
  select: ["name", "age"],
  group: "type",
  filter: {
    age: {
      $gt: "10",
      $lt: "20",
    },
    level: {
      $gte: "10",
      $lte: "20",
    },
    plate: {
      $regex: {},
    },
    tag: {
      $ne: "pretty",
    },
    title: {
      $regex: {},
    },
    type: ["test1", "test2"],
  },
  _expand: "department",
};

qs.stringfy(denormalize(queryObj));

// return " _expand=department&_group=type&_limit=10&_offset=0&_populate=user&_select=name&_select=age&_sort=updatedAt&_sort=-createdAt&age_gt=10&age_lt=20&assignees=%2A&followers=none&level_gte=10&level_lte=20&plate_like=%E6%B2%AAA&q=hello&tag_ne=pretty&title_like=hello&type=test1&type=test2"
```

## What is query normalizr

![image](https://user-images.githubusercontent.com/4343458/53739979-0c2d6f00-3ece-11e9-9c32-9516ecea9c25.png)

### Query in route (QIR)

#### Array

we use standard url query format to pass array data.

```curl
a=1&a=2
```

#### Filter

Use `.` to access deep properties

```curl
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode
```

### Paginate

Use `_offset` and optionally `_limit` to paginate returned data. (an `X-Total-Count` header is included in the response)

```curl
GET /posts?_offset=10
GET /posts?_offset=7&_limit=20
```

node 10 items are return by default

#### Sort

Add `_sort`

```curl
# asc
GET /posts?_sort=views

# desc
GET /posts/1/comments?_sort=-votes
```

For multiple fields, use the following format:

```curl
GET /posts/1/comments?_sort=-votes&_sort=likes
```

\_prefixing a path with `-` will flag that sort is descending order.
When a path does not have the `-` prefix, it is ascending order.

#### Operators

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

#### Select

Specifies which document fields to include or exclude

```curl
GET /posts?_select=title&_select=body
GET /posts?_select=-comments&_select=-views
```

_prefixing a path with `-` will flag that path as excluded.
When a path does not have the `-` prefix, it is included_
A projection must be either inclusive or exclusive.
In other words, you must either list the fields to include (which excludes all others),
or list the fields to exclude (which implies all other fields are included).

### Query in service (QIS)

```js
{
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
  }
}
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**query-normalizr** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/query-normalizr/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node) · Twitter [@y](https://twitter.com/y)

[0]: https://img.shields.io/npm/v/@36node/query-normalizr.svg?style=flat
[1]: https://npmjs.com/package/@36node/query-normalizr
[2]: https://img.shields.io/npm/dm/@36node/query-normalizr.svg?style=flat
[3]: https://npmjs.com/package/@36node/query-normalizr
