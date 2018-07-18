import path from "path";

import { jsonfile } from "./lib";
import { init } from "./index";
import download from "./download-npm-package";

jest.mock("./download-npm-package");
jest.mock("./lib");
jest.mock("fs-extra");

test("init", () => {
  jsonfile.readFile.mockResolvedValue({});

  const tpl = "module";
  const dest = ".";
  const pkgFile = path.join(dest, "package.json");
  const options = {
    name: "somepkg",
    owner: "tester",
    scope: "36node"
  };

  return init(tpl, dest, options)
    .then(() => {
      expect(download).toBeCalled();
      expect(jsonfile.readFile).toBeCalledWith(pkgFile);
      expect(jsonfile.writeFile).toBeCalledWith(
        pkgFile,
        {
          name: "@36node/somepkg",
          repository: {
            url: "tester/somepkg",
            type: "git"
          }
        },
        { spaces: 2 }
      );
    })
    .catch(err => {
      console.error(err);
    });
});
