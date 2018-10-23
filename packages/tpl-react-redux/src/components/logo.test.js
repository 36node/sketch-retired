import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Logo from "./logo";

it("should renders correctly", () => {
  const tree = renderer.create(<Logo>somthing</Logo>).toJSON();
  expect(tree).toMatchSnapshot();
});
