/**
 * Here we use json-server, find more in https://github.com/typicode/json-server
 */

const faker = require("faker");
const _ = require("lodash");

const fakePets = count =>
  _.range(count).map((val, index) => ({
    id: faker.random.uuid(),
    name: faker.name.lastName(),
    tag: faker.random.arrayElement(["CAT", "DOG"]),
    owner: faker.name.firstName(),
    age: faker.random.number(15),
  }));

module.exports = {
  /**
   * mock data
   */
  db: {
    pets: fakePets(100),
  },

  /**
   * rewrite the url if needed
   */
  rewrite: {
    "/vehicles/*/logs": "/logs",
    "/vehicles/:vid/records": "/records?vehicleId=:vid",
  },
};
