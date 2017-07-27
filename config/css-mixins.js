module.exports = {
  'retina-background-image': (rule, path) => ({
    backgroundImage: `url(${path})`,

    // `-webkit-min-device-pixel-ratio` is added automatically
    '@media (min-resolution: 144dpi)': {
      // match the last instance of `.` then replace it with `@2x.`
      backgroundImage: `url(${path.replace(/\.(?=[^.]*$)/, '@2x.')})`,
    },
  }),

  // simple mixin but it expresses (and hopefully ensure)
  // that width & height change together
  size: (rule, value) => ({
    width: value,
    height: value,
  }),

  truncate: () => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
};
