const program = require("commander");
const inquirer = require("inquirer");
const path = require("path");

const cli = require("../dist");
const { gitUser } = require("../dist/lib");

program
  .option("-si, --skip-install", "skip installation")
  .option("-t, --template <name>", "all templates: module, react, react-redux, service, tcp")
  .parse(process.argv);

const dest = program.args[0] || ".";
const baseFolderName = path.basename(path.resolve(process.cwd(), dest));
const questions = [
  {
    type: "list",
    name: "template",
    message: "which boilerplate do you want use:",
    choices: ["module", "react", "react-redux", "service", "tcp"],
    when: () => !program.template
  },
  {
    name: "name",
    message: "What is your package name?",
    default: baseFolderName
  },
  {
    name: "owner",
    message: "Who is package's owner?",
    default: gitUser().name
  },
  {
    name: "scope",
    message: "What is the package scope?",
    default: ""
  }
];

inquirer
  .prompt(questions)
  .then(answers => {
    const template = program.template || answers.template;
    return cli.init(template, dest);
  })
  .catch(err => console.error(err));
