import React from "react";
import renderer from "react-test-renderer";

import TestText from "./TestText";

describe("<TestText />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<TestText />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
