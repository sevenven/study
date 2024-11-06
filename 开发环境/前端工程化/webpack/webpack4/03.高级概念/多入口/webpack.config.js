const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.join(__dirname, './', 'src');
const distPath = path.join(__dirname, '/.', 'dist');
const templatePath = path.join(__dirname, './', 'template');

module.exports = {
	mode: 'development',
	entry: {
		index: path.join(srcPath, 'index.js'),
		other: path.join(srcPath, 'other.js')
	},
	output: {
		path: distPath, // 打包产物存放路径
		filename: '[name].[hash:8].js' // name 即多入口时 entry 的 key
	},
	plugins: [
		// 多入口 - 生成 index.html
		new HtmlWebpackPlugin({
			template: path.join(templatePath, 'index.html'),
			filename: 'index.html',
			// chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
			chunks: ['index', 'vendor', 'common'] // 考虑代码分割
		}),
		// 多入口 - 生成 other.html
		new HtmlWebpackPlugin({
			template: path.join(templatePath, 'other.html'),
			filename: 'other.html',
			chunks: ['other', 'vendor', 'common'] // 考虑代码分割
		}),
		// 每次打包前清除上一次打包的结果
		new CleanWebpackPlugin()
	]
};
