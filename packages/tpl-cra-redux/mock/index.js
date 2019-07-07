/**
 * Here we use json-server, find more in https://github.com/typicode/json-server
 */

const _ = require("lodash");
const petsMockFn = require("@36node/template-sdk/mock");

const petsMock = petsMockFn({});

module.exports = {
  /**
   * mock data
   */
  db: {
    ...petsMock.db,
  },

  /**
   * rewrite the url if needed
   */
  rewrite: {
    ...petsMock.rewrites,
  },

  routers: [petsMock.routers],

  aggregations: petsMock.aggregations,
};
