const { CLIEngine } = require('eslint');
const ora = require('ora');

const rules = require('./rules');

module.exports = () => {
  const spinner = ora('eslint').start();
  const config = {
    extensions: ['.js'],
    envs: ['node'],
    cwd: process.cwd(),
    useEslintrc: false,
    baseConfig: {
      extends: 'airbnb-base'
    },
    rules
  };

  const engine = new CLIEngine(config);
  const report = engine.executeOnFiles(['**/*.js']);
  const formatter = engine.getFormatter('codeframe');

  if (report.errorCount === 0) {
    spinner.succeed('success: eslint');
  } else {
    spinner.stop();
    console.log(formatter(report.results));
  }
};
