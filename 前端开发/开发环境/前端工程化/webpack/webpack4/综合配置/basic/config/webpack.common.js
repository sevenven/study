const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { srcPath, distPath } = require('./paths');

module.exports = {
	// 打包入口
	entry: {
		main: path.join(srcPath, 'index.js')
	},
	// 打包输出
	output: {
		path: distPath,
		// 包含 contenthash 的文件名，用于缓存优化
		filename: 'js/[name].[contenthash:8].js',
		// 异步加载的代码块文件名
		chunkFilename: 'js/[name].chunk.[contenthash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				// 处理 JS 文件的 loader，先执行 eslint 再执行 babel
				use: ['babel-loader', 'eslint-loader']
			},
			{
				test: /\.(scss|css)$/,
				use: [
					// 将 CSS 提取为独立文件
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							// 处理 @import 引入的文件
							importLoaders: 2,
							// CSS 模块化配置
							modules: {
								auto: true // 自动检测是否需要模块化
							}
						}
					},
					// 添加浏览器前缀
					'postcss-loader',
					// 处理 SCSS 文件
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: {
					// 处理图片文件，小于 limit 转为 base64
					loader: 'url-loader',
					options: {
						name: '[name]_[hash:8].[ext]',
						outputPath: 'images/',
						limit: 10 * 1024 // 10KB
					}
				}
			},
			{
				test: /\.(eot|ttf|svg|woff|woff2)$/,
				use: {
					// 处理字体文件
					loader: 'file-loader',
					options: {
						name: '[name]_[hash:8].[ext]',
						outputPath: 'fonts/'
					}
				}
			}
		]
	},
	plugins: [
		// 生成 HTML 文件并自动引入打包后的资源
		new HtmlWebpackPlugin({
			template: path.join(srcPath, 'index.html'),
			filename: 'index.html'
		}),
		// 清理上次打包的文件
		new CleanWebpackPlugin(),
		// 提取 CSS 到独立文件
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].chunk.[contenthash:8].css'
		})
	],
	optimization: {
		// 开启 Tree Shaking
		usedExports: true,
		// 代码分割配置
		splitChunks: {
			// 同步和异步代码都进行分割
			chunks: 'all',
			// 生成 chunk 的最小体积
			minSize: 20 * 1024,
			// chunk 的最大体积，超过后尝试进行二次分割
			maxSize: 500 * 1024,
			// 分割规则
			cacheGroups: {
				// 第三方模块
				vendors: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: 10 // 优先级
				},
				// 公共模块
				commons: {
					name: 'commons',
					minChunks: 2, // 至少被引用 2 次才会被分割
					priority: 0
				}
			}
		}
	}
};
