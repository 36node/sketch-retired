const generate = require("./pet");
const _ = require("lodash");

const myRouter = (req, res, next) => {
  /** example */
  // if (req.path === "/sessions" && req.method === "POST") {
  //   req.body.token = TOKEN;
  // }
  next();
};

const rewrites = { "/aaaaaaa*": "/bbbbbbb$1" };

/**
 * mock
 *
 * @param {object} opt mock options
 * @param {number} opt.count how many pets to be generated
 */
const mock = ({ count = 100 }) => ({
  /**
   * mock data
   */
  db: {
    pets: generate(count),
  },

  /**
   * rewrite
   */
  rewrites,

  routers: [myRouter],

  aggregations: {
    "/pets": {
      grade: "avg",
      count: records => records.length,
    },
  },
});

module.exports = mock;
