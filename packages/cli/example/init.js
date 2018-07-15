import path from "path";
import { init } from "../src";

init("module", path.join(__dirname, "snapshot"), {
  name: "foo",
  owner: "36node",
  scope: "36node"
});
