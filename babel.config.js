const { isDev } = require('./build/build.config');

module.exports = api => {
  api.cache(true);
  return {
    //sourceType: 'unambiguous',
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@loadable/babel-plugin',
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
