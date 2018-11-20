const mockPet = require("./.mock/pet");

module.exports = {
  /**
   * mock data
   */
  db: {
    pets: mockPet(20),
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
