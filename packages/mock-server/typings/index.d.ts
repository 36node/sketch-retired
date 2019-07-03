import { Application } from "express";
import { Request, IRouterHandler } from "express-serve-static-core";

declare module "@36node/mock-server" {
  interface MockOpts {
    db: object;
    rewrites?: object;
    routers?: [IRouterHandler];
    aggregations?: object;
    app?: Application;
    shouldMock?: (req: Request) => Boolean;
  }

  function MockServer(opts: MockOpts): Application;

  export = MockServer;
}
