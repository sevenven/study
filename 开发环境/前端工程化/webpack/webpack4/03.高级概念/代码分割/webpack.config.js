const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

module.exports = {
	mode: 'development', // 默认值: production
	// 方式一
	// entry: {
	// 	libraries: './src/libraries.js',
	// 	main: './src/index.js'
	// },
	// output: {
	// 	path: distPath, // 打包产物存放路径
	// 	filename: '[name].[contenthash:8].js' // name 即多入口时 entry 的 key
	// },
	// 方式二
	entry: './src/index.js',
	output: {
		path: distPath,
		filename: 'main.js',
		chunkFilename: '[name].chunk.[contentHash:8].js'
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
		// splitChunks: {
		// 	// all分割异步和同步引入的代码、async 只分割异步引入的方法
		// 	chunks: 'async',
		// 	// 代码分割的组
		// 	cacheGroups: {
		// 		vendors: false,
		// 		default: false
		// 	}
		// }
		// 默认配置项解读
		splitChunks: {
			chunks: 'all', // async 只分割异步引入的方法 all分割异步和同步引入的代码-需要搭配cacheGroups使用
			minSize: 0, // 分割出来的代码体积最小要多小-单位Bytes
			// maxSize: 300 * 1024, // webpack会尝试根据maxSize将打包出来的代码进行二次分割-单位Bytes
			minChunks: 1, // 至少有N个打包生成的模块用了某个库的时候才对某个符合其他条件的库进行代码分割
			maxInitialRequests: 30, // 入口文件引入的库最多可以分割成多少个chunks
			maxAsyncRequests: 30, // 最多同时加载多少个chunks
			automaticNameDelimiter: '-', // 文件名生成的时候分包名与主包名之间的连接符 默认'~'
			cacheGroups: {
				// vendors: false,
				// 同步分包策略1
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					name: 'venders' // 分包文件名
				},
				// default: false
				// 同步分包策略2
				default: {
					priority: -20,
					filename: 'other.[name].[contentHash:8].js', // 分包文件名
					reuseExistingChunk: true // 如果一个模块已经被打包过 再打包的时候会忽略 直接使用之前的打包
				}
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
