export const listPetsReqSchema = {
  additionalProperties: false,
  type: "object",
  required: [],
  properties: {
    query: {
      additionalProperties: false,
      type: "object",
      required: [],
      properties: {
        _limit: {
          type: "integer",
          format: "int32",
          default: 10,
          maximum: 1000,
        },
        _offset: { type: "integer", format: "int32", default: 0 },
        _sort: { type: "string" },
        _select: { type: "array", items: { type: "string" } },
        tag: { type: "string" },
        age_gt: { type: "integer" },
        birthAt_gt: { type: "string", format: "date" },
        birthAt_lt: { type: "string", format: "date" },
        grade_gt: { type: "string", format: "date" },
        grade_lt: { type: "string", format: "date" },
      },
    },
  },
};
export const listPetsResSchema = {
  additionalProperties: false,
  type: "object",
  required: [],
  properties: {
    content: {
      type: "array",
      items: {
        allOf: [
          {
            additionalProperties: false,
            type: "object",
            properties: {
              name: { type: "string", description: "pet's name" },
              tag: { type: "string", enum: ["DOG", "CAT"] },
              age: { type: "integer", format: "int32" },
              birthAt: { type: "string", format: "date" },
              grade: { type: "integer", format: "int32" },
              owner: { type: "string" },
              other1: { type: "string", readOnly: true },
            },
          },
          {
            additionalProperties: false,
            type: "object",
            required: ["id"],
            properties: {
              id: { type: "string" },
              updateAt: { tsType: "Date", type: "string", format: "date-time" },
              updateBy: { type: "string" },
              createAt: { tsType: "Date", type: "string", format: "date-time" },
              createBy: { type: "string" },
            },
          },
        ],
      },
    },
    headers: {
      additionalProperties: false,
      type: "object",
      required: ["X-Total-Count"],
      properties: { "X-Total-Count": { type: "integer" } },
    },
  },
};
export const createPetReqSchema = {
  additionalProperties: false,
  type: "object",
  required: ["body"],
  properties: {
    body: {
      allOf: [
        {
          additionalProperties: false,
          type: "object",
          properties: {
            name: { type: "string", description: "pet's name" },
            tag: { type: "string", enum: ["DOG", "CAT"] },
            age: { type: "integer", format: "int32" },
            birthAt: { type: "string", format: "date" },
            grade: { type: "integer", format: "int32" },
            owner: { type: "string" },
            other2: { type: "string", writeOnly: true },
          },
        },
        {
          additionalProperties: false,
          type: "object",
          required: ["name"],
          properties: { name: { type: "string", description: "pet's name" } },
        },
      ],
    },
  },
};
export const createPetResSchema = {
  additionalProperties: false,
  type: "object",
  required: [],
  properties: {
    content: {
      allOf: [
        {
          additionalProperties: false,
          type: "object",
          properties: {
            name: { type: "string", description: "pet's name" },
            tag: { type: "string", enum: ["DOG", "CAT"] },
            age: { type: "integer", format: "int32" },
            birthAt: { type: "string", format: "date" },
            grade: { type: "integer", format: "int32" },
            owner: { type: "string" },
            other1: { type: "string", readOnly: true },
          },
        },
        {
          additionalProperties: false,
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
            updateAt: { tsType: "Date", type: "string", format: "date-time" },
            updateBy: { type: "string" },
            createAt: { tsType: "Date", type: "string", format: "date-time" },
            createBy: { type: "string" },
          },
        },
      ],
    },
  },
};
export const showPetByIdReqSchema = {
  additionalProperties: false,
  type: "object",
  required: ["petId"],
  properties: { petId: { type: "string", pattern: "[a-f\\d]{24}" } },
};
export const showPetByIdResSchema = {
  additionalProperties: false,
  type: "object",
  required: [],
  properties: {
    content: {
      allOf: [
        {
          additionalProperties: false,
          type: "object",
          properties: {
            name: { type: "string", description: "pet's name" },
            tag: { type: "string", enum: ["DOG", "CAT"] },
            age: { type: "integer", format: "int32" },
            birthAt: { type: "string", format: "date" },
            grade: { type: "integer", format: "int32" },
            owner: { type: "string" },
            other1: { type: "string", readOnly: true },
          },
        },
        {
          additionalProperties: false,
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
            updateAt: { tsType: "Date", type: "string", format: "date-time" },
            updateBy: { type: "string" },
            createAt: { tsType: "Date", type: "string", format: "date-time" },
            createBy: { type: "string" },
          },
        },
      ],
    },
  },
};
export const updatePetReqSchema = {
  additionalProperties: false,
  type: "object",
  required: ["petId", "body"],
  properties: {
    petId: { type: "string", pattern: "[a-f\\d]{24}" },
    body: {
      additionalProperties: false,
      type: "object",
      properties: {
        name: { type: "string", description: "pet's name" },
        tag: { type: "string", enum: ["DOG", "CAT"] },
        age: { type: "integer", format: "int32" },
        birthAt: { type: "string", format: "date" },
        grade: { type: "integer", format: "int32" },
        owner: { type: "string" },
        other2: { type: "string", writeOnly: true },
      },
    },
  },
};
export const updatePetResSchema = {
  additionalProperties: false,
  type: "object",
  required: [],
  properties: {
    content: {
      allOf: [
        {
          additionalProperties: false,
          type: "object",
          properties: {
            name: { type: "string", description: "pet's name" },
            tag: { type: "string", enum: ["DOG", "CAT"] },
            age: { type: "integer", format: "int32" },
            birthAt: { type: "string", format: "date" },
            grade: { type: "integer", format: "int32" },
            owner: { type: "string" },
            other1: { type: "string", readOnly: true },
          },
        },
        {
          additionalProperties: false,
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
            updateAt: { tsType: "Date", type: "string", format: "date-time" },
            updateBy: { type: "string" },
            createAt: { tsType: "Date", type: "string", format: "date-time" },
            createBy: { type: "string" },
          },
        },
      ],
    },
  },
};
export const deletePetReqSchema = {
  additionalProperties: false,
  type: "object",
  required: ["petId"],
  properties: { petId: { type: "string", pattern: "[a-f\\d]{24}" } },
};
