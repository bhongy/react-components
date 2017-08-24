// avoid using "env" in `.babelrc` in favor of moving
// toward new API in Babel 7
// https://github.com/babel/babel/issues/5276

const presets = [
  [
    'env',
    {
      modules: false,
      targets: {
        browsers: ['last 2 versions'],
      },
    },
  ],
  'stage-2',
  'react',
];

exports.development = {
  presets,
  plugins: [
    'lodash',
    'react-hot-loader/babel',
    // add source filename and line number to JSX
    // helpful for debuggin when an exception is thrown
    // use in development only
    'transform-react-jsx-source',
  ],
};

exports.production = {
  presets,
  plugins: ['lodash'],
};
