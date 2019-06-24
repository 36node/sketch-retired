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

Use `_offset` and optionally `_limit` to paginate returned data. (an `X-Total-Count` header is included in the response)

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.

```curl
GET /posts?_offset=10
GET /posts?_offset=7&_limit=20
```

note: _10 items are returned by default_

### Sort

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

`_like` support array

```curl
GET /posts?title_like=server
```

`_group` support groupBy some field

**suggestion**: Do not mix analytic api and business api

```curl
GET /statistics/post?_group=author
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
  limit: 10,
  offset: 10,
  sort: "-createdBy", // if array should be: ["-createdBy", "views"]
  select: ["views", "body"], // if single should be: "views"
  group: ["ns", "author"], // group by
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
    assignees: "*",
    followers: "none",
    q: "hello"
  }
}
```

- 其中非 `_` 开头的字段都将放到 filter property 下面。
