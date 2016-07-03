var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
		context: path.resolve(__dirname, '..'),
		entry: './src/main.jsx',
		output: {
				path: './public',
				filename: 'app.bundle.js',
		},
		module: {
				loaders: [{
						test: /\.jsx$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
						query: {
		          presets: ['es2015', 'react']
		        }
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
			new HtmlWebpackPlugin({
				template: './src/index.html'
			})
		]
};
