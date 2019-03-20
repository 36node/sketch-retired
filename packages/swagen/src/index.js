import requireDirectory from "require-directory";

const genreatorModule = requireDirectory(module, "./generators");

// parse generators from module
const generators = {};
Object.keys(genreatorModule)
  .filter(k => typeof genreatorModule[k].default === "function")
  .forEach(k => (generators[k] = genreatorModule[k].default));

export { generators };
