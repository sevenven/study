const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

module.exports = {
	mode: 'development', // 默认值: production
	// 方式二
	entry: './src/index.js',
	output: {
		path: distPath,
		filename: 'main.js',
		chunkFilename: '[name].[contentHash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	// 底层是 SplitChunksPlugin 插件
	optimization: {
		// 代码分割策略-总体来讲可以使用默认配置 通过统一包版本及treeshaking来控制包体积 通过异步来将非首屏加载的包分出来 如果首屏包确实非常大，此时可以通过配置同步的包分割，同时保证js可以并行请求来优化加载速度
		splitChunks: {
			// all分割异步和同步引入的代码、async 只分割异步引入的方法
			chunks: 'async',
			// 代码分割的组
			cacheGroups: {
				vendors: false,
				default: false
			}
		}
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
