import requireDirectory from "require-directory";

module.exports = requireDirectory(module, { exclude: /lib\.js$/ });
