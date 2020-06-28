export const listPetsReqSchema = {
  type: "object",
  required: [],
  properties: {
    query: {
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
  type: "object",
  required: [],
  properties: {
    content: {
      type: "array",
      items: {
        allOf: [
          {
            type: "object",
            properties: {
              name: { type: "string", description: "pet's name" },
              tag: { type: "string", enum: ["DOG", "CAT"] },
              age: { type: "integer", format: "int32" },
              birthAt: { type: "string", format: "date" },
              grade: { type: "integer", format: "int32" },
              owner: { type: "string" },
            },
          },
          {
            type: "object",
            required: ["id"],
            properties: {
              id: { type: "string" },
              updateAt: { type: "string", format: "date-time" },
              updateBy: { type: "string" },
              createAt: { type: "string", format: "date-time" },
              createBy: { type: "string" },
            },
          },
        ],
      },
    },
    headers: {
      type: "object",
      required: ["X-Total-Count"],
      properties: { "X-Total-Count": { type: "integer" } },
    },
  },
};
export const createPetReqSchema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      allOf: [
        {
          type: "object",
          properties: {
            name: { type: "string", description: "pet's name" },
            tag: { type: "string", enum: ["DOG", "CAT"] },
            age: { type: "integer", format: "int32" },
            birthAt: { type: "string", format: "date" },
            grade: { type: "integer", format: "int32" },
            owner: { type: "string" },
          },
        },
        { type: "object", required: ["name"] },
      ],
    },
  },
};
export const createPetResSchema = {
  type: "object",
  required: [],
  properties: {
    content: {
      allOf: [
        {
          type: "object",
          properties: {
            name: { type: "string", description: "pet's name" },
            tag: { type: "string", enum: ["DOG", "CAT"] },
            age: { type: "integer", format: "int32" },
            birthAt: { type: "string", format: "date" },
            grade: { type: "integer", format: "int32" },
            owner: { type: "string" },
          },
        },
        {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
            updateAt: { type: "string", format: "date-time" },
            updateBy: { type: "string" },
            createAt: { type: "string", format: "date-time" },
            createBy: { type: "string" },
          },
        },
      ],
    },
  },
};
export const showPetByIdReqSchema = {
  type: "object",
  required: ["petId"],
  properties: { petId: { type: "string", pattern: "[a-f\\d]{24}" } },
};
export const showPetByIdResSchema = {
  type: "object",
  required: [],
  properties: {
    content: {
      allOf: [
        {
          type: "object",
          properties: {
            name: { type: "string", description: "pet's name" },
            tag: { type: "string", enum: ["DOG", "CAT"] },
            age: { type: "integer", format: "int32" },
            birthAt: { type: "string", format: "date" },
            grade: { type: "integer", format: "int32" },
            owner: { type: "string" },
          },
        },
        {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
            updateAt: { type: "string", format: "date-time" },
            updateBy: { type: "string" },
            createAt: { type: "string", format: "date-time" },
            createBy: { type: "string" },
          },
        },
      ],
    },
  },
};
export const updatePetReqSchema = {
  type: "object",
  required: ["petId", "body"],
  properties: {
    petId: { type: "string", pattern: "[a-f\\d]{24}" },
    body: {
      type: "object",
      properties: {
        name: { type: "string", description: "pet's name" },
        tag: { type: "string", enum: ["DOG", "CAT"] },
        age: { type: "integer", format: "int32" },
        birthAt: { type: "string", format: "date" },
        grade: { type: "integer", format: "int32" },
        owner: { type: "string" },
      },
    },
  },
};
export const updatePetResSchema = {
  type: "object",
  required: [],
  properties: {
    content: {
      allOf: [
        {
          type: "object",
          properties: {
            name: { type: "string", description: "pet's name" },
            tag: { type: "string", enum: ["DOG", "CAT"] },
            age: { type: "integer", format: "int32" },
            birthAt: { type: "string", format: "date" },
            grade: { type: "integer", format: "int32" },
            owner: { type: "string" },
          },
        },
        {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
            updateAt: { type: "string", format: "date-time" },
            updateBy: { type: "string" },
            createAt: { type: "string", format: "date-time" },
            createBy: { type: "string" },
          },
        },
      ],
    },
  },
};
export const deletePetReqSchema = {
  type: "object",
  required: ["petId"],
  properties: { petId: { type: "string", pattern: "[a-f\\d]{24}" } },
};
