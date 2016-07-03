var Express = require('express');
var webpack = require('webpack');

var webpackConfig = require('./dev.config');

var host = process.env.HOST || 'localhost';
var port = parseInt(process.env.PORT) || 3000;

var WriteFilePlugin = require('write-file-webpack-plugin');

webpackConfig.plugins.push(new WriteFilePlugin({log: false, useHashIndex: true})); // append to config.
webpackConfig.output.publicPath = 'http://' + host + ':' + port + '/'; // fix setting the public path

webpackConfig.devServer = {
  outputPath: webpackConfig.output.path
}; // must be overgiven https://github.com/gajus/write-file-webpack-plugin/issues/1

var compiler = webpack(webpackConfig);

var serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  historyApiFallback: true,
  publicPath: 'http://' + host + ':' + port + process.env.PUBLIC_ABSOLUTE_URL_PATH_PREFIX, // must be defined in sourced env., // webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  // watchOptions: {
  //   aggregateTimeout: 300,
  //   poll: 1000
  // },
  stats: {
    colors: true
  }
};

var app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler, serverOptions));

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error("webpack-dev-server onAppListening", err);
  } else {
    console.info('==> 🔮  Webpack development server listening on port %s.\n==> 🚧  Please wait while webpack is generating the initial bundle...', port);
  }
});
