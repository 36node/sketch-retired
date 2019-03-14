import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Content from "./content";

it("should renders correctly", () => {
  const tree = renderer.create(<Content> somthing </Content>).toJSON();
  expect(tree).toMatchSnapshot();
});
