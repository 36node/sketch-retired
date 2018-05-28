#!/usr/bin/env node

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../config/webpack.dev');

const compiler = webpack(config.toConfig());
const devServerOptions = Object.assign({}, {
  /* dev-server options */
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(7000, '0.0.0.0', () => {
  console.log('服务启动: http://localhost:7000');
});
