import path from "path";

import { readFile, writeFile } from "./lib/jsonfile-then";
import init from "./init";
import download from "./download-npm-package";

jest.mock("./download-npm-package");
jest.mock("./lib/jsonfile-then");
jest.mock("fs-extra");

test("init", () => {
  readFile.mockResolvedValue({});

  const tpl = "module";
  const dest = ".";
  const pkgFile = path.join(dest, "package.json");
  const options = {
    name: "somepkg",
    owner: "tester",
    scope: "36node",
  };

  return init(tpl, dest, options).then(() => {
    expect(download).toBeCalled();
    expect(readFile).toBeCalledWith(pkgFile);
    expect(writeFile).toBeCalledWith(
      pkgFile,
      {
        files: ["bin", "dist"],
        name: "@36node/somepkg",
        repository: {
          url: "tester/somepkg",
          type: "git",
        },
        version: "0.0.0",
      },
      { spaces: 2 }
    );
  });
});
