const faker = require("faker");
module.exports = {
  /**
   * Generate mock data
   */
  mockFn: () => {
    const data = { pets: [] };
    const tags = ["CAT", "DOG", "RABBIT"];

    for (let i = 0; i < 100; i++) {
      data.pets.push({
        id: i,
        name: faker.name.lastName(),
        tag: tags[faker.random.number(2)],
      });
    }

    return data;
  },
  /**
   * Config mock server
   */
  serverOpts: () => ({
    delay: 2000,
  }),
};
