const path = require('path');
const devText = 'development';

const prodText = 'production';

const isDev = process.env.NODE_ENV === devText;

const filesRegExp = /\.(jpe?g|png|gif|pdf|woff2?|eot|otf|mp3|mp4|svg|bmp)$/;
const enableSSR = JSON.parse(process.env.SSR);
const jsFilename = isDev ? '[name].js' : '[name].[contenthash:8].min.js';
const cssFilename = isDev ? '[name].css' : '[name].[contenthash:8].min.css';
const hbsTemplate = path.resolve('views/index.template.hbs');

const fileOutputName = isDev
  ? 'assets/[name].[ext]'
  : 'assets/[name].min.[contenthash:8].[ext]';



function getFileHandle(ssr) {
  const result = {
    test: filesRegExp,
    options: {
      name: fileOutputName,
    },
    loader: 'file-loader',
  };
  ssr && (result.options.emitFile = false);
  return result;
}

module.exports = {
  devText,
  prodText,
  isDev,
  filesRegExp,
  fileOutputName,
  enableSSR,
  getFileHandle,
  jsFilename,
  cssFilename,hbsTemplate
};
