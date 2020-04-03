const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base');
const devServerConfig = require('./weboack.dev');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const {
  getFileHandle,
  isDev,
  cssFilename,
  hbsTemplate,
  enableSSR,
} = require('./build.config');

const miniCssRule = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: isDev,
  },
};
const clientConfig = {
  devtool: 'source-map',

  entry: [
    isDev && 'react-hot-loader/patch',
    isDev && 'webpack-dev-server/client',
    './src/client/main.ts',
  ].filter(Boolean),
  output: {
    path: path.resolve('public/client'),
  },
  module: {
    rules: [
      getFileHandle(),
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve('tsconfig.build.json'),
              transpileOnly: true,
              onlyCompileBundledFiles: true,
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [
          miniCssRule,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          miniCssRule,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ].filter(Boolean),
      },
    ],
  },
  resolve: {
    alias: {},
  },
  plugins: [
    /**
     * 如果即不是开发模式，又关闭了SSR，则进入服务端渲染模式
     */
    new HtmlWebpackPlugin({
      template: hbsTemplate,
      filename: '../../views/index.hbs',
      alwaysWriteToDisk: true,
      minify: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    (!isDev || !enableSSR) &&
      new HtmlWebpackPlugin({
        template: hbsTemplate,
        filename: 'index.html',
      }),
    isDev && new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: cssFilename,
      chunkFilename: cssFilename,
    }),
  ].filter(Boolean),
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /node_modules/,
          priority: 1,
        },
        common: {
          name: 'common',
          minSize: 0,
          minChunks: 2,
          chunks: 'initial',
        },
      },
    },
  },
};

if (isDev) {
  clientConfig.resolve.alias['react-dom'] = '@hot-loader/react-dom';
  clientConfig.devtool = 'cheap-module-source-map';
  clientConfig.devServer = devServerConfig;
}

module.exports = webpackMerge(baseConfig, clientConfig);
