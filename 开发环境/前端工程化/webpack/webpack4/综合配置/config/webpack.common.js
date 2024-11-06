const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { srcPath, distPath } = require('./paths');

module.exports = {
	entry: './src/index.js',
	output: {
		path: distPath,
		filename: 'main.js'
	},
	plugins: [
		// 将打包出来的js加载到相应的html上
		new HtmlWebpackPlugin({
			template: path.join(srcPath, 'index.html')
		}),
		// 每次打包前清除上一次打包的结果
		new CleanWebpackPlugin()
	],
	optimization: {
		usedExports: true
	}
};
