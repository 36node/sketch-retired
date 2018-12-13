const petstoreDB = require("./.mock/petstore/db.json");
const petstoreRoute = require("./.mock/petstore/routes.json");

console.log(petstoreDB);

module.exports = {
  /**
   * mock data
   */
  db: {
    ...petstoreDB,
  },

  /**
   * rewrite
   */
  rewrite: {
    "/vehicles/*/logs": "/logs",
    "/vehicles/:vid/records": "/records?vehicleId=:vid",
  },

  /**
   * Config mock server
   */
  serverOpts: {
    delay: 500,
  },
};
