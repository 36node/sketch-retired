import parseGitConfig from "parse-git-config";
import gitConfigPath from "git-config-path";

module.exports = function() {
  const gitConfig = parseGitConfig.sync({ cwd: "/", path: gitConfigPath("global") });
  return Object.assign({ name: "", email: "" }, gitConfig.user);
};
