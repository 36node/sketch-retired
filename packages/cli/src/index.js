import path from "path";
import ora from "ora";
import { copy, remove } from "fs-extra";

import download from "./download-npm-package";
import { jsonfile } from "./lib";

export async function init(tpl, dest = ".", options = {}) {
  const pkg = `@36node/template-${tpl}`;
  const spinner = ora(`Downloading template ${pkg}...`);

  try {
    spinner.start();
    await download(pkg, dest);
    spinner.succeed("Downloading success.");
  } catch (err) {
    spinner.fail("Downloading failed.");
    throw err;
  }

  // generate common template files
  try {
    spinner.text = "Generating common template files ...";
    spinner.start();
    await copy(path.join(__dirname, "../template"), dest, { overwrite: false });
    await remove(path.join(dest, "CHANGELOG.md"));
    spinner.succeed("Generating basic files success!");
  } catch (err) {
    spinner.fail("Generating basic files failed!");
    throw err;
  }

  try {
    spinner.text = "Modifying package.json ...";
    spinner.start();
    const pkgFile = path.join(dest, "package.json");
    const pkgJson = await jsonfile.readFile(pkgFile);

    let { name, owner, scope } = options;
    const repository = {
      url: `${owner}/${name}`,
      type: "git"
    };
    name = scope ? `@${scope}/${name}` : name;
    await jsonfile.writeFile(pkgFile, { ...pkgJson, name, repository }, { spaces: 2 });
    spinner.succeed(`Package.json cooked! ${path.resolve(dest)}`);
  } catch (err) {
    spinner.fail("Modifying package.json failed.");
    throw err;
  }
}
