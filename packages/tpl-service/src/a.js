import Ajv from "ajv";

const ajv = new Ajv({
  coerceTypes: "array",
  removeAdditional: "all", // strip any property not in openapi.yml
});

const schema = {
  additionalProperties: true,
  allOf: [
    {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", description: "pet's name" },
        tag: { type: "string", enum: ["DOG", "CAT"] },
        age: { type: "integer" },
        birthAt: { type: "string", format: "date" },
      },
    },
    {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
        createAt: { type: "string", format: "time" },
      },
    },
  ],
};

const validator = ajv.compile(schema);

const data = {
  name: "tom",
  tag: "CAT",
  age: 1,
  add: "2020-06-14T08:41:56.872Z",
  createdAt: "2020-06-14T08:41:56.872Z",
  id: "5ee5b284e6e6e1e49c916bf2",
};

if (!validator(data)) {
  console.log(validator.errors);
}

console.log(data);
