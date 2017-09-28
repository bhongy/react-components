/* eslint-disable import/order */

const project = require('./project');

// the list of plugins used is intentionally limited
// to force us to "compose" components rather than
// relying on new CSS API that might not be around
// in the future (non-transferable knowledge).

// plugins like advaned-variables, mixins, and calc
// should be used sparingly in favor of component compositions
// they exists to express relationships of
// logics and values that is lacking in CSS

// color function is not provided in favor of using
// variables with well-defined palette upfront
// for consistency

// plugins are used top (first) to bottom
// hence the order is important
// https://github.com/postcss/postcss-loader#plugins
exports.development = [
  require('postcss-discard-comments')(),

  // TODO: (possible) add postcss-import if needed

  // TODO: add linters (after import but before other)
  // stylelint, stylefmt, doiuse
  // https://github.com/postcss/postcss#linters

  // allow using Sass-like mixins to cleanly writes out
  // block of CSS (e.g. retina-background-image)
  require('postcss-mixins')({
    mixins: require('./css-mixins'),
  }),
  // allow using Sass-like variables (`$my-var`) available in CSS
  require('postcss-advanced-variables')({
    variables: require('./css-variables'),
  }),
  // allow using color($my-color modifier(value)) e.g. color($brand-blue, alpha(0.3))
  require('postcss-color-function')(),
  // allow nesting selectors and at-rules
  require('postcss-nesting')(),
  // reduce result of calc(`expression`) when possible
  require('postcss-calc')({
    precision: 4,
    warnWhenCannotResolve: true,
  }),
  // allow writing standard CSS properties without
  // needing to write vendor prefixes
  require('autoprefixer')({
    browsers: project.browsers,
    // don't add flexbox prefix for legacy IE
    flexbox: 'no-2009',
  }),
];

exports.production = exports.development.concat([
  // @media(s) are one the largest text chunk in CSS
  // group media queries in a module together
  // to reduce file size in production
  require('css-mqpacker')(),
]);
