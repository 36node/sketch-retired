const path = require('path');

const Config = require('webpack-chain');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = new Config();

config
  .entry('main')
  .add('./src/index.js')
  .end()
  .output
  .filename('bundle-[hash].js');

config.module
  .rule('compile')
  .test(/\.js$/)
  .include
  .add(path.resolve(process.cwd(), 'src'))
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    presets: ['env']
  });

config
  .plugin('html')
  .use(HtmlWebpackPlugin, [{
    template: 'index.html'
  }]);

module.exports = config;
