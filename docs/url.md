# service url

We define our url pattern as following.

## Route Pattern

We would suggest all api route pattern use following patterns.
It is the world wide best practice.

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

Use `_page` and optionally `_limit` to paginate returned data.

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.

```curl
GET /posts?_page=7
GET /posts?_page=7&_limit=20
```

note: _10 items are returned by default_

### Sort

Add `_sort` and `_order` (ascending order by default)

```curl
GET /posts?_sort=views&_order=asc
GET /posts/1/comments?_sort=votes&_order=asc
```

For multiple fields, use the following format:

```curl
GET /posts?_sort=user,views&_order=desc,asc
```

note: _list posts by publishAt descending order and views ascending order_

### Slice

Add `_start` and `_end` or `_limit` (an `X-Total-Count` header is included in the response)

```curl
GET /posts?_start=20&_end=30
GET /posts/1/comments?_start=20&_end=30
GET /posts/1/comments?_start=20&_limit=10
```

_Works exactly as [Array.slice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) (i.e. `_start` is inclusive and `_end` exclusive)_

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

To include children resources, add `_embed`

```curl
GET /posts?_embed=comments
GET /posts/1?_embed=comments
```

To include parent resource, add `_expand`

```curl
GET /comments?_expand=post
GET /comments/1?_expand=post
```

To get or create nested resources (by default one level, [add custom routes](#add-custom-routes) for more)

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

## Query In Our Service

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
