const { isDev } = require('./build/build.config');

module.exports = api => {
  api.cache(true);
  return {
    sourceType: 'unambiguous',
    presets: [
      [
        '@babel/preset-env',
        {
          //loose:true,
          modules: false,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      [
        'babel-plugin-styled-components',
        {
          ssr: true,
          pure: true,
        },
      ],
      isDev && 'react-hot-loader/babel',
    ].filter(Boolean),
  };
};
