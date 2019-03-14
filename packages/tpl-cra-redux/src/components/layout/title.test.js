import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Title from "./title";

it("should renders correctly", () => {
  const tree = renderer.create(<Title>somthing</Title>).toJSON();
  expect(tree).toMatchSnapshot();
});
