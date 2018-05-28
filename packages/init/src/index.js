const inquirer = require('inquirer');
const ora = require('ora');
const downloadGitRepo = require('download-git-repo');
const execa = require('execa');

const questions = require('./questions');
const templates = require('./templates');

function download(project, dir) {
  return new Promise((resolve, reject) => {
    downloadGitRepo(project, dir, { clone: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('download success');
      }
    });
  });
}

async function downloadTemplate(template, name) {
  const spinner = ora('下载模板...');
  try {
    spinner.start();
    await download(template, name);
    spinner.succeed('下载模板成功');
  } catch (e) {
    spinner.fail('下载模板失败');
  }
}

async function installDeps(cwd) {
  const spinner = ora('安装依赖...');
  spinner.start();
  try {
    await execa.shell('yarn install', { cwd });
    spinner.succeed('安装依赖成功');
  } catch (e) {
    spinner.fail('安装依赖失败');
  }
}

module.exports = async function () {
  const { name, templateName } = await inquirer.prompt(questions);
  await downloadTemplate(templates[templateName], name);
  await installDeps(name);
};
