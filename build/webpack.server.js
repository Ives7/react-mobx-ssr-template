const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const nodeExternals = require('webpack-node-externals');
const { isDev, getFileHandle } = require('./build.config');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = function(/*options*/) {
  return merge(baseConfig, {
    entry: ['./src/server/main.ts'],
    watch: isDev,
    target: 'node',
    output: {
      filename: '[name].js',
      path: path.resolve('dist'),
    },
    node: { __filename: false, __dirname: false },
    plugins: [
      new LoadablePlugin(),
    ],
    module: {
      rules: [
        getFileHandle(true),
        {
          test: /\.(c|le|sc)ss$/,
          use: 'ignore-loader',
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                onlyCompileBundledFiles: true,
                configFile: 'tsconfig.build.json',
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    externals: [nodeExternals({})],
  });
};
