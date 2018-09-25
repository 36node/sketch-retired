import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Header from "./header";

it("should renders correctly", () => {
  const tree = renderer.create(<Header>somthing</Header>).toJSON();
  expect(tree).toMatchSnapshot();
});
