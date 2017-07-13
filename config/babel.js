// avoid using "env" in `.babelrc` in favor of moving
// toward new API in Babel 7

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
]

exports.development = {
  presets,
}
  plugins: ['lodash', 'react-hot-loader/babel'],

exports.production = {
  presets,
}
  plugins: ['lodash'],
