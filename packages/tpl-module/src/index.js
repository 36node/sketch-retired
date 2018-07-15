import fs from "fs";

export function listFiles(dir) {
  const files = fs.readdirSync(dir);
  return files;
}
