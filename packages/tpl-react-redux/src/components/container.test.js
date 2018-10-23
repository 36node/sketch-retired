import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Container from "./container";

it("should renders correctly", () => {
  const tree = renderer.create(<Container>somthing</Container>).toJSON();
  expect(tree).toMatchSnapshot();
});
