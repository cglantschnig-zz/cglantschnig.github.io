require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var assetsPath = path.resolve(__dirname, '../dist');
var host = 'localhost';
var port = parseInt(process.env.PORT) || 3000;

var HtmlWebpackPlugin = require("html-webpack-plugin");

// var appDir = path.resolve(__dirname, '../src');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var loadBabelConfiguration = require("./loadBabelConfiguration");
var babelLoaderQuery = loadBabelConfiguration("development", {
  cacheDirectory: true
});

module.exports = {
  devtool: 'cheap-module-inline-source-map', // 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?reload=true&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/preload.js',
      './src/app.jsx'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: process.env.PUBLIC_ABSOLUTE_URL_PATH_PREFIX, // must be defined in sourced env.
    pathinfo: true
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.less$/, // with css modules
      // loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap'),
      loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap',
      exclude: /src\/assets/
    }, {
      test: /\.less$/, // global
      // loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap'),
      loader: 'style!css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap',
      include: /src\/assets/
    }, {
      test: /\.scss$/, // with css modules
      // loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'),
      loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap',
      exclude: /src\/assets/
    }, {
      test: /\.scss$/, // global
      // loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'),
      loader: 'style!css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap',
      include: /src\/assets/
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff&name=assets/[path][name].[ext]"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff&name=assets/[path][name].[ext]"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream&name=assets/[path][name].[ext]"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file?name=assets/[path][name].[ext]"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml&name=assets/[path][name].[ext]"
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url-loader?limit=1&name=assets/[path][name].[ext]' // TODO: specify proper inline file limit...
    }]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [

    new CleanPlugin(['dist'], {
      root: process.cwd()
    }),

    // hot reload
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.IgnorePlugin(/webpack-stats\.json$/),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true // will automatically inject all built js and css chuncks
    }),

    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __API_BASE_URL__: "'" + process.env.API_BASE_URL + "'"
    }),

    webpackIsomorphicToolsPlugin.development(true)
  ],
  eslint: {
    failOnWarning: false,
    failOnError: false
  }
};
