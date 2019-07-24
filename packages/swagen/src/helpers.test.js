import { hasJsonBody, getJsonBodySchema, normalizeQuery } from "./helpers";

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

const ListParams = [
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
  {
    name: "_sort",
    in: "query",
    schema: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  {
    name: "_limit",
    in: "query",
    description: "How many items to return at one time (max 100)",
    schema: {
      type: "integer",
      format: "int64",
      default: 10,
    },
  },
  {
    name: "_offset",
    in: "query",
    description: "How many items to return at one time (max 100)",
    schema: {
      type: "integer",
      format: "int64",
      default: 10,
    },
  },
  {
    name: "_group",
    in: "query",
    schema: {
      type: "string",
    },
  },
  {
    name: "_exist",
    in: "query",
    schema: {
      type: "string",
    },
  },
  {
    name: "tag",
    in: "query",
    description: "Pet tags",
    schema: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  {
    name: "age_gt",
    in: "query",
    description: "Pet age_gt",
    schema: {
      type: "integer",
      format: "int32",
    },
  },
  {
    name: "age_lt",
    in: "query",
    description: "Pet age_lt",
    schema: {
      type: "integer",
      format: "int32",
    },
  },
  {
    name: "level_gte",
    in: "query",
    schema: {
      type: "integer",
      format: "int32",
    },
  },
  {
    name: "level_lte",
    in: "query",
    schema: {
      type: "integer",
      format: "int32",
    },
  },
  {
    name: "type",
    in: "query",
    schema: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  {
    name: "plate_like",
    in: "query",
    schema: {
      type: "string",
    },
  },
];

const ListParamsNStr = `
  query:{
    limit?: number;
    offset?: number;
    sort?: [string];
    group?: string;
    _exist?: string;

    filter:{
        "tag"?: [string];
        "age": {
            $gt?: number;
            $lt?: number;
        }
        "level": {
            $gte?: number;
            $lte?: number;
        }
        "type"?: [string];
        "plate": {
            $regex?: string;
        }
    }
  }
  `;

test("Shoule get json body from operation", () => {
  expect(hasJsonBody(postOperation)).toBe(true);
  expect(getJsonBodySchema(postOperation)).not.toBe(null);

  expect(hasJsonBody(deleteOperation)).toBe(false);
  expect(getJsonBodySchema(deleteOperation)).toBe(null);
});

test("Should normalize query", () => {
  const ret = normalizeQuery(ListParams);

  expect(ret).toEqual(ListParamsNStr);
});
