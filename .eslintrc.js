const lodash = require('lodash');
const fbConfig = require('eslint-config-fbjs');

// keep all detail of the rules the same as eslint-config-fbjs
// but override only parts of them by mutating the original
module.exports = {
  extends: ['fbjs'],
  rules: {
    // replace max-len from 80 to 100
    'max-len': lodash.set(fbConfig.rules['max-len'], '1', 100),
  },
};
