import pets from "./pet";

const myRouter = (req, res, next) => {
  /** example */
  // if (req.path === "/sessions" && req.method === "POST") {
  //   req.body.token = TOKEN;
  // }
  next();
};

const rewrites = { "/aaaaaaa": "/bbbbbbb" };

module.exports = {
  /**
   * mock data
   */
  db: {
    pets,
  },

  /**
   * rewrite
   */
  rewrites,

  routers: [myRouter],
};
