import jsonfile from "jsonfile";
import path from "path";

export function getPackage(dest = ".") {
  const pkgFile = path.join(dest, "package.json");
  return jsonfile.readFileSync(pkgFile);
}
