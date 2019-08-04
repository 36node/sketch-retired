import path from "path";
import ora from "ora";
import fs from "fs";
import readline from "readline";
import { remove } from "fs-extra";

const extraDependencyRegInJsx = new RegExp(
  "({\\/\\* extra sample code begin \\*\\/\\})[\\n\\s\\S]*?({\\/\\* extra sample code end \\*\\/\\})",
  "g"
);
const extraDependencyRegInJS = new RegExp(
  "// extra sample code begin[\\n\\s\\S]*?// extra sample code end",
  "g"
);

function traverseDir(path, callback) {
  const iterator = fs.readdirSync(path);
  iterator.forEach(file => {
    const info = fs.statSync(path + "/" + file);
    if (info.isDirectory()) {
      traverseDir(`${path}/${file}`);
    } else {
      if (callback) callback(`${path}/${file}`);
    }
  });
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
    traverseDir(dest + "/src", path => {
      fs.readFile(path, "utf8", async (err, data) => {
        if (err) {
          throw err;
        }
        let result = data;
        result = result.replace(extraDependencyRegInJS, "");
        result = result.replace(extraDependencyRegInJsx, "");
        await fs.writeFile(path, result, "utf8", function(err) {
          if (err) throw err;
        });
      });
    });
    spinner.succeed(
      `Removing extra dependencies succeed! ${path.resolve(dest)}`
    );
  } catch (err) {
    spinner.fail("Removing extra dependencies failed.");
    throw err;
  }
}
