const faker = require("faker");
const _ = require("lodash");

const pets = count =>
  _.range(count).map((val, index) => ({
    id: faker.random.uuid(),
    name: faker.name.lastName(),
    tag: faker.random.arrayElement(["CAT", "DOG", "RABBIT"]),
  }));

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
  rewrite: {},

  /**
   * Config mock server
   */
  serverOpts: {
    delay: 500,
  },
};
