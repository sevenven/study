const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcPath, distPath } = require('./paths');

module.exports = {
	entry: path.join(srcPath, 'index'),
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader?cacheDirectory'], //开启babel编译缓存
				include: srcPath,
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(srcPath, 'index.html'),
			filename: 'index.html'
		})
	]
};
