const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const { isDev } = require('./build/build.config');

module.exports = () => {
  return {
    plugins: [
      postcssPresetEnv({ stage: 0 }),
      !isDev && cssnano({ stage: 0 }),
    ].filter(Boolean),
  };
};
