const program = require("commander");
const inquirer = require("inquirer");
const path = require("path");
const parseGitConfig = require("parse-git-config");
const gitConfigPath = require("git-config-path");

const cli = require("../dist");

const enableTpls = [
  "cli",
  "cra-redux",
  "module",
  "sdk",
  "service",
  "tcp",
  "react-component",
];

function gitUser() {
  const gitConfig = parseGitConfig.sync({
    cwd: "/",
    path: gitConfigPath("global"),
  });
  return Object.assign({ name: "", email: "" }, gitConfig.user);
}

program
  .option("-si, --skip-install", "skip installation")
  .option("-t, --template <name>", `all templates: ${enableTpls.join(",")}`)
  .parse(process.argv);

const dest = program.args[0] || ".";
const baseFolderName = path.basename(path.resolve(process.cwd(), dest));
const questions = [
  {
    type: "list",
    name: "template",
    message: "which boilerplate do you want use:",
    choices: enableTpls,
    when: () => !program.template,
  },
  {
    name: "name",
    message: "What is your package name?",
    default: baseFolderName,
  },
  {
    name: "owner",
    message: "Who is package's owner?",
    default: gitUser().name,
  },
  {
    name: "scope",
    message: "What is the package scope?",
    default: "",
  },
];

inquirer
  .prompt(questions)
  .then(answers => {
    const template = program.template || answers.template;
    return cli.init(template, dest, answers);
  })
  .catch(err => console.error(err));
