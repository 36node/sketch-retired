const faker = require("faker");
const _ = require("lodash");

const generate = count =>
  _.range(count).map((val, index) => ({
    id: faker.random.uuid(),
    name: faker.name.lastName(),
    tag: faker.random.arrayElement(["CAT", "DOG", "RABBIT"]),
  }));

module.exports = generate(100);
