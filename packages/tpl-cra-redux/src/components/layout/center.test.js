import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Center from "./center";

it("should renders correctly", () => {
  const tree = renderer.create(<Center>somthing</Center>).toJSON();
  expect(tree).toMatchSnapshot();
});
