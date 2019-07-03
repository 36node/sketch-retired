const faker = require("faker");
const _ = require("lodash");
const moment = require("moment");

const now = moment();

const generate = count =>
  _.range(count).map((val, index) => {
    const birthAt = faker.date.between(
      moment()
        .subtract(10, "year")
        .toDate(),
      moment()
        .subtract(1, "year")
        .toDate()
    );

    const age = now.diff(moment(birthAt), "year");

    return {
      id: faker.random.uuid(),
      name: faker.name.lastName(),
      tag: faker.random.arrayElement(["CAT", "DOG"]),
      owner: faker.name.firstName(),
      grade: faker.random.number({ min: 1, max: 5 }),
      age,
      birthAt: birthAt.toISOString(),
    };
  });

module.exports = generate;
