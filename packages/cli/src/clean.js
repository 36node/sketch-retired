import path from "path";
import ora from "ora";
import klawSync from "klaw-sync";
import fs from "fs-extra";
import readline from "readline";
import { remove } from "fs-extra";
import { exec } from "child_process";

const extraDependencyRegInJsx = new RegExp(
  "({\\/\\* extra sample code begin \\*\\/\\})[\\n\\s\\S]*?({\\/\\* extra sample code end \\*\\/\\})",
  "g"
);
const extraDependencyRegInJS = new RegExp(
  "// extra sample code begin[\\n\\s\\S]*?// extra sample code end",
  "g"
);

async function cleanDependenciesInFile(target) {
  const { path } = target;
  let result = await fs.readFileSync(path, "utf8");
  result = result.replace(extraDependencyRegInJS, "");
  result = result.replace(extraDependencyRegInJsx, "");
  await fs.writeFileSync(path, result, "utf8");
}

export default async function clean(dest = ".", options = {}) {
  const spinner = ora(`Cleaning template ...`);
  // remove extra files
  try {
    spinner.text = "Removing extra template files ...";
    spinner.start();
    const ignoreFile = path.join(dest, "templates.ignore");
    const lr = readline.createInterface({
      input: fs.createReadStream(ignoreFile),
    });
    lr.on("line", async ignoreFilePath => {
      await remove(path.join(dest, ignoreFilePath));
    });

    await remove(path.join(dest, "CHANGELOG.md"));
    spinner.succeed("Removing extra template files success!");
  } catch (err) {
    spinner.fail("Removing extra template files failed!");
    throw err;
  }

  // remove extra files' dependencies
  try {
    spinner.text = "Removing dependencies ...";
    spinner.start();
    const files = klawSync(dest + "/src", { nodir: true });
    for (let i = 0, len = files.length; i < len; i++) {
      cleanDependenciesInFile(files[i]);
    }
    spinner.succeed(
      `Removing extra dependencies succeed! ${path.resolve(dest)}`
    );
  } catch (err) {
    spinner.fail("Removing extra dependencies failed.");
    throw err;
  }

  // prettier files
  // TODO: write it more elegantly
  const child = exec(
    `prettier --trailing-comma es5 --write '${dest}/src/**/*.js'`,
    (error, stdout, stderr) => {
      spinner.text = "Prettier files ...";
      spinner.start();
      if (error !== null) {
        spinner.fail("Prettier files failed.");
      } else {
        spinner.succeed(
          `Removing extra dependencies succeed! ${path.resolve(dest)}`
        );
      }
    }
  );
  child();
}
