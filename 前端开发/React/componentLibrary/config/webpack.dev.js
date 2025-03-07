const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	output: {
		path: path.resolve(process.cwd(), './dist'),
		filename: 'index.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(process.cwd(), './public/index.html')
		})
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		port: 3000,
		hot: true
	}
});
