require('dotenv').config();

const { isDev, devText, prodText, jsFilename } = require('./build.config');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  output: {
    publicPath: process.env.PUBLIC_PATH,
    filename: jsFilename,
    chunkFilename: jsFilename,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css', '.less'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.build.json',
        extensions: ['.ts', '.tsx'],
        mainFields: ['browser', 'main'],
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
          },
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  mode: isDev ? devText : prodText,
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      compilerOptions: {
        modules: 'commonjs',
      },
    }),
  ],
};
