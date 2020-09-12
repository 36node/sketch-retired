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
  "expo",
  "nextjs",
  "wxapp",
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
    when: ansers => ansers.template !== "expo",
  },
  {
    name: "appName",
    message: "What is your app name?",
    validate: input => !!input.trim(),
    when: ansers => ansers.template === "expo",
  },
  {
    name: "appSlug",
    message: "What is your app slug?",
    validate: input => !!input.trim(),
    when: ansers => ansers.template === "expo",
  },
  {
    name: "bundleIdentifier",
    message: "What is your app ios bundle identifier?Example: expo.36node.com.",
    validate: input => !!input.trim(),
    when: ansers => ansers.template === "expo",
  },
  {
    name: "androidPackage",
    message: "What is your app android package?Example: expo.36node.com.",
    validate: input => !!input.trim(),
    when: ansers => ansers.template === "expo",
  },
  {
    name: "owner",
    message: "Who is package's owner?",
    default: gitUser().name,
    when: ansers => ansers.template !== "expo",
  },
  {
    name: "scope",
    message: "What is the package scope?",
    default: "",
    when: ansers => ansers.template !== "expo",
  },
];

inquirer
  .prompt(questions)
  .then(answers => {
    const template = program.template || answers.template;
    return cli.init(template, dest, answers);
  })
  .catch(err => console.error(err));
