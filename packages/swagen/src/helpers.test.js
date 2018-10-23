import { hasJsonBody, getJsonBodySchema } from "./helpers";

const postOperation = {
  method: "post",
  name: "createPets",
  operationId: "createPets",
  path: "/pets",
  requestBody: {
    description: "Pet to add to the store",
    required: true,
    content: {
      schema: {
        required: ["name"],
        properties: {
          name: {
            type: "string",
          },
          tag: {
            type: "string",
          },
        },
      },
      examples: {
        default: {
          value: '{\n  "name": "dd",\n  "tag": "red"\n}\n',
        },
      },
    },
  },
  response: {
    description: "The Pet created",
    content: {
      schema: {
        required: ["id", "name"],
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: "string",
          },
          tag: {
            type: "string",
          },
        },
      },
      examples: {
        default: {
          value: '{\n  "id": 4,\n  "name": "dd",\n  "tag": "red"\n}\n',
        },
      },
    },
    status: 201,
  },
  summary: "Create a pet",
};

const deleteOperation = {
  method: "delete",
  name: "deletePet",
  operationId: "deletePet",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of pet to delete",
      required: true,
      schema: {
        type: "integer",
        format: "int64",
      },
    },
  ],
  path: "/pets/{petId}",
  response: {
    description: "pet deleted",
    status: 204,
  },
};

test("Shoule get json body from operation", () => {
  expect(hasJsonBody(postOperation)).toBe(true);
  expect(getJsonBodySchema(postOperation)).not.toBe(null);

  expect(hasJsonBody(deleteOperation)).toBe(false);
  expect(getJsonBodySchema(deleteOperation)).toBe(null);
});
