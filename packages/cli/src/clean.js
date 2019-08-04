import path from "path";
import ora from "ora";
import fs from "fs";
import { remove } from "fs-extra";

export default async function clean(dest = "./dest", options = {}) {
  const spinner = ora(`Cleaning template ...`);

  // remove extra files
  try {
    spinner.text = "Removing extra template files ...";
    spinner.start();
    const ignoreFile = path.join(dest, "templates.ignore");
    const ignoreFiles = fs.readFile(ignoreFile);
    console.log(ignoreFiles);

    await remove(path.join(dest, "CHANGELOG.md"));
    spinner.succeed("Removing extra template files success!");
  } catch (err) {
    spinner.fail("Removing extra template files failed!");
    throw err;
  }

  // try {
  //   spinner.text = "Removing dependencies ...";
  //   spinner.start();
  //   const pkgFile = path.join(dest, "package.json");
  //   const pkgJson = await jsonfile.readFile(pkgFile);

  //   let { name, owner, scope } = options;
  //   pkgJson.files = ["bin", "dist", "mock", "typings"];
  //   pkgJson.version = "0.0.0";
  //   pkgJson.repository = {
  //     url: `${owner}/${name}`,
  //     type: "git",
  //   };
  //   pkgJson.name = scope ? `@${scope}/${name}` : name;
  //   if (pkgJson["config-overrides-path"]) {
  //     pkgJson["config-overrides-path"] =
  //       "node_modules/@36node/sketch/config-overrides";
  //   }
  //   console.log(pkgJson);
  //   await jsonfile.writeFile(pkgFile, pkgJson, { spaces: 2 });
  //   spinner.succeed(`Package.json cooked! ${path.resolve(dest)}`);
  // } catch (err) {
  //   spinner.fail("Modifying package.json failed.");
  //   throw err;
  // }
}
