const path = require('path');

const { enableSSR } = require('./build.config');

const devServerConfig = {
  host: '0.0.0.0',
  publicPath: process.env.PUBLIC_PATH,
  port: process.env.DEV_SERVER_PORT,
  hot: true,
  inline: true,
  disableHostCheck: true,
  historyApiFallback: true,
  stats: {
    color: true,
    error: true,
  },
  contentBase: [
    path.resolve('public'),
    path.resolve('views'),
    path.resolve('src/client/assets'),
  ],
  open: true,
  quiet: true,
  compress: true,
  clientLogLevel: 'none',
  useLocalIp: true,
  watchContentBase: true,
  proxy: {},
};

if (enableSSR) {
  devServerConfig.proxy['**'] = {
    target: `http://localhost:${process.env.HTTP_SERVER_PORT}`,
  };
}
module.exports = devServerConfig;
