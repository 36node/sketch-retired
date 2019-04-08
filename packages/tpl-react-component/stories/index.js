import React from "react";
import { storiesOf } from "@storybook/react";

import TestComponent from "../src";

// default demo
storiesOf("Welcome", module).add("to Storybook", () => <TestComponent />);
