import { Application } from "express";
import { Request, IRouterHandler } from "express-serve-static-core";

declare module "@36node/mock-server" {
  interface MockOpts {
    db: object;
    rewrites: object;
    routers: [IRouterHandler];
    aggregations: object;
  }

  function MockServer(
    app: Application,
    opts: MockOpts,
    shouldMock?: (req: Request) => Boolean
  ): void;

  export = MockServer;
}
