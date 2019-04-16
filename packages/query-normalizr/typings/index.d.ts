import Koa = require("koa");

declare module "@36node/query-normalizr" {
  interface UrlQuery {
    _limit?: number;
    _offset?: number;
    _sort?: [string] | string;
    _populate?: [string] | string;
    _select?: [string] | string;
    _group?: [string] | string;
  }

  interface NormalizeQuery {
    limit?: number;
    offset?: number;
    sort?: [string] | string;
    populate?: [string] | string;
    select?: [string] | string;
    group?: [string] | string;
  }

  interface JsonServerQuery {
    _limit?: number;
    _start?: number;
    _sort?: string;
    _order?: string;
    _embed?: string;
  }

  export function normalize(fromUrl: UrlQuery): NormalizeQuery;
  export function denormalize(queryObj: NormalizeQuery): UrlQuery;
  export function QueryNormalizr(options: object): Koa.Middleware;
  export function toJsonServer(fromUrl: UrlQuery): JsonServerQuery;
}
