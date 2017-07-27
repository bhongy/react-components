const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const project = require('./project');

module.exports = {
  context: project.paths.src(),
  entry: {
    main: [
      // activate HMR for React
      'react-hot-loader/patch',
      // only need this for Webpack 2 with webpack-hot-middleware
      // https://github.com/glenjamin/webpack-hot-middleware/blob/40745357fa0c069204d01c993371bdbcd2e6fc74/README.md#200
      'webpack-hot-middleware/client',
      './index.js',
    ],
    vendor: project.entry.vendor,
  },

  output: {
    filename: '[name].js',
    path: project.paths.build(),
    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: project.paths.src(),
        options: Object.assign(
          {
            babelrc: false,
            // enable caching for faster webpack rebuild
            cacheDirectory: true,
          },
          require('./babel').development,
        ),
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              import: false,
              importLoaders: 1,
              localIdentName: '[name]__[local]--[hash:base64:6]',
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // allow using inline comments "//"
              // the parser will turn it to CSS comment "/* */"
              parser: 'postcss-scss',
              plugins: require('./postcss-plugins').development,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    // otherwise HMR will log module id instead
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // important: "manifest" has to follow "vendor"
      // otherwise it will be included in "vendor" and cause
      // vendor [chunkhash] to change everytime
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: project.paths.src('index.ejs'),
    }),
  ],
};
