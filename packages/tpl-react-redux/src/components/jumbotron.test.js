import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Jumbotron from "./jumbotron";

it("should renders correctly", () => {
  const tree = renderer.create(<Jumbotron>somthing</Jumbotron>).toJSON();
  expect(tree).toMatchSnapshot();
});
