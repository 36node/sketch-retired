import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Component from "./index";

it("should renders correctly", () => {
  const tree = renderer.create(<Component>somthing</Component>).toJSON();
  expect(tree).toMatchSnapshot();
});
