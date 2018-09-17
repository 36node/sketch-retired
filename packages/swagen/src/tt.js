import { get } from "lodash";

const content = {
  "application/json": {
    schema: {
      type: "array",
    },
  },
};

const r = get(content, ["application/json", "schema", "type"]);
console.log(r);
