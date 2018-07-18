import tmp from "tmp";
import { copy, mkdirp, readdir } from "fs-extra";
import path from "path";
import spawn from "cross-spawn";
import tar from "tar";

/**
 * @param {string} pkg 包名 例如@36node/template-module
 * @param {string} dest 目标目录
 * @returns {Promise<string>} Promise<dest>
 */
export default async (pkg, dest) => {
  try {
    // step 1: prepare tmp dir
    const tmpObj = tmp.dirSync({ unsafeCleanup: true });

    // step 2: download package from npm
    const result = await spawn.sync("npm", ["pack", pkg], {
      stdio: "ignore",
      cwd: tmpObj.name
    });

    if (result.status !== 0) {
      throw new Error(`spawn npm pack ${pkg} failed`);
    }

    const files = await readdir(tmpObj.name);
    if (files.length === 0) {
      throw new Error("download from npm tar failed");
    }

    // step 3: extract and copy to dest
    await tar.x({
      file: path.join(tmpObj.name, files[0]),
      cwd: tmpObj.name
    });
    await mkdirp(dest);
    await copy(path.join(tmpObj.name, "package"), dest);

    // step 4: clean up
    tmpObj.removeCallback();

    return dest;
  } catch (err) {
    Promise.reject(err);
  }
};
