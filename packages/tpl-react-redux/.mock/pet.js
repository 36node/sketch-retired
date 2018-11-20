const faker = require("faker");
const _ = require("lodash");

module.exports = count =>
  _.range(count).map((val, index) => ({
    id: faker.random.uuid(),
    name: faker.name.lastName(),
    tag: faker.random.arrayElement(["CAT", "DOG", "RABBIT"]),
  }));
