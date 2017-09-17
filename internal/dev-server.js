const express = require('express');
const webpack = require('webpack');
const project = require('../config/project');
const webpackConfig = require('../config/webpack')({ production: false });

const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
});
const hotMiddleware = require('webpack-hot-middleware')(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);
app.get('*', (req, res) => {
  const indexFile = devMiddleware.fileSystem.readFileSync(project.paths.build('index.html'));
  res.end(indexFile);
});

const port = 8888;
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`http://localhost:${port}`);
});
