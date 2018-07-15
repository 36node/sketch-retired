import parseGitConfig from "parse-git-config";
import gitConfigPath from "git-config-path";

module.exports = function() {
  return Object.assign(
    { name: "", email: "" },
    parseGitConfig.sync({ cwd: "/", path: gitConfigPath("global") }).user
  );
};
