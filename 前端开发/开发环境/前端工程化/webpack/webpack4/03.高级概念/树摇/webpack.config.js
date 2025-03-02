const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

module.exports = {
	// mode: 'production', // 默认
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: distPath,
		filename: 'main.js'
	},
	optimization: {
		usedExports: true // 开启Tree Shaking -> prodction环境默认开启
	},
	plugins: [
		// 将打包出来的js加载到相应的html上
		new HtmlWebpackPlugin({
			template: path.join(srcPath, 'index.html')
		}),
		// 每次打包前清除上一次打包的结果
		new CleanWebpackPlugin()
	]
};
