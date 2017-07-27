const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./project');

module.exports = {
  context: project.paths.src(),
  entry: {
    main: ['./index.js'],
    vendor: project.entry.vendor,
  },

  output: {
    // use [chunkhash] in production only
    // because it increases compilation time
    filename: '[name].[chunkhash:12].js',
    path: project.paths.build(),
    // publicPath: 'https://cdn.google.com',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: project.paths.src(),
        options: Object.assign(
          { babelrc: false },
          require('./babel').production
        ),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[hash:base64:8]',
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                parser: 'postcss-scss',
                plugins: require('./postcss-plugins').production,
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      ie8: false,
      // warnings: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new CleanWebpackPlugin([project.paths.build()], {
      root: project.paths.root(),
    }),
    // This will extract all CSS even from dyanmically imported chunks
    // track progress for CSS extract for dynamic chunks in this issue:
    // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/455
    new ExtractTextPlugin({
      filename: '[name].[contenthash:12].css',
      // disable allChunks to avoid extracting CSS from
      // dynamically imported chunks
      // allChunks: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: project.paths.src('index.ejs'),
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest',
    }),
  ],
};
