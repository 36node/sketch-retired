import download from "./download-npm-package";
import spawn from "cross-spawn";
import fs from "fs-extra";
import tmp from "tmp";
import tar from "tar";

jest.mock("cross-spawn");
jest.mock("fs-extra");
jest.mock("tmp");
jest.mock("tar");

test("download", () => {
  const removeCallback = jest.fn();
  const tmpFolder = "fake-tmp-folder";
  spawn.sync.mockReturnValue({ status: 0 });
  tmp.dirSync.mockReturnValue({ removeCallback, name: tmpFolder });
  fs.readdir.mockResolvedValue(["some-file"]);

  const pkg = "level";
  const dest = "./tmp";

  return download(pkg, dest)
    .then(output => {
      expect(tmp.dirSync).toBeCalledWith({ unsafeCleanup: true });
      expect(spawn.sync).toBeCalledWith("npm", ["pack", pkg], {
        stdio: "ignore",
        cwd: tmpFolder,
      });
      expect(fs.readdir).toBeCalledWith(tmpFolder);
      expect(tar.x).toBeCalled();
      expect(fs.mkdirp).toBeCalledWith(dest);
      expect(fs.copy).toBeCalled();
      expect(removeCallback).toBeCalled();

      expect(output).toBe(dest);
    })
    .catch(err => {
      console.error(err);
    });
});
