// Do not provide default, prefer explicitness
module.exports = (env) => {
  if (env.production) {
    return require('./webpack.production')
  }

  return require('./webpack.development')
}
