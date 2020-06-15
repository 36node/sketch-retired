# @36node/query-normalizr

[![version][0]][1] [![downloads][2]][3]

这里 query-normalizr 的作用: 将经过类型转换的 koa query 规则化成对应数据库的 query。

## Install

```bash
yarn add @36node/query-normalizr
```

## Usage

```js
import { toMongooseQuery } from "@36node/query-normalizr";

console.log(rawQuery);
/*
{
  _limit: 10,
  _offset: 10,
  _sort: "-createdBy",
  _populate: "user",
  _select: ["views", "body"],
  _group: ["ns", "author"],
  age_lt: 10,
  age_gt: 5,
  tag_ne: "pretty",
  name: "sherry",
  title_like: "hello",
  assignees: "*",
  followers: "none",
  q: hello"
};
*/
const mQuery = toMongooseQuery(rawQuery);
console.log(mQuery);
/*
{
  limit: 10,
  offset: 10,
  sort: "-createdBy", // if array should be: ["-createdBy", "views"]
  select: ["views", "body"], // if single should be: "views"
  group: ["ns", "author"], // group by
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
    title: /hello/i,  // like
    assignees: { $ne: [] },
    followers: { $eq: [] },
    $text: { $search: "hello" }
  }
}
*/
```

### Query in route (QIR)

reference in [url.md](../../docs/url.md)

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
