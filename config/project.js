const path = require('path');

exports.browsers = ['last 2 versions'];

/**
 * Paths
 */

const rootPath = path.resolve(__dirname, '..');
const root = path.resolve.bind(null, rootPath);

exports.paths = {
  root,
  src: root.bind(null, 'src'),
  build: root.bind(null, 'build'),
};

/**
 * Webpack
 */

exports.entry = {
  vendor: ['react', 'react-dom'],
};
