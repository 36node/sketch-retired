import { stripProps } from ".";

test("Should strip props successfully", () => {
  const body = {
    p1: {
      type: "string",
      description: "p1-type",
    },
    description: "p1",
    p2: [
      {
        type: "string",
        description: "p2-type",
      },
    ],
  };
  const striped = {
    p1: {
      type: "string",
    },
    p2: [
      {
        type: "string",
      },
    ],
  };

  expect(stripProps(body, "description", "title")).toEqual(striped);
});
