var fs = require('fs');
var _ = require("lodash");
var prettyjson = require('prettyjson');

module.exports = function loadBabelConfiguration(environment, opts) {

  var babelrc = fs.readFileSync('./.babelrc');
  var babelrcObject = {};

  try {
    babelrcObject = JSON.parse(babelrc);
  } catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
  }

  var babelrcEnvironmentObject = babelrcObject.env && babelrcObject.env[environment] || {};
  var babelLoaderQuery = Object.assign({}, babelrcObject, babelrcEnvironmentObject);

  if (_.isArray(babelrcEnvironmentObject.plugins) && _.isArray(babelrcObject.plugins)) {
    babelLoaderQuery.plugins = _.union(babelrcObject.plugins, babelrcEnvironmentObject.plugins);
  }

  delete babelLoaderQuery.env;

  babelLoaderQuery = _.defaultsDeep(opts, babelLoaderQuery);

  console.log("-- babelrc: Using " + environment + " configuration\n" + prettyjson.render(babelLoaderQuery, {noColor: false}) + "\n--\n");

  return babelLoaderQuery;
}
