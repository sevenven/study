const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

module.exports = {
	mode: 'development', // 默认值 'production'
	// 打包的入口
	entry: path.join(srcPath, 'index.js'),
	// 打包的出口
	output: {
		path: distPath, // 打包产物存放路径
		// publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
		filename: '[name]_[hash:8].js' // name 即多入口时 entry 的 key
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				// use: {
				//   loader: 'file-loader', // 将图片打包移动到指定目录下
				//   options: {
				//     // 占位符(placeholder)写法
				//     name: '[name]_[hash].[ext]',
				//     outputPath: 'images/'
				//   }
				// },
				use: {
					loader: 'url-loader', // 当文件体积小于limit时会打包成base64随js加载，大于limit时将图片打包移动到指定目录下
					options: {
						name: '[name]_[hash:8].[ext]',
						outputPath: 'images/',
						limit: 2 * 1024 // 2048Byte = 2KB
					}
				}
			},
			{
				test: /\.(css|scss)$/,
				// loader的执行顺序是从后往前的
				use: [
					// style-loader把内容挂载到header上
					'style-loader',
					// css-loader分析css文件间的关系 将几个文件合并成一个文件
					{
						loader: 'css-loader',
						options: {
							// css里面使用import引入的文件可以执行哪些loader
							importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader&sass-loader
							// css模块化打包 => style.xxx 类名打包后会变成'ZYAf6xDyRZF56xdN2Ybxug=='
							modules: true
						}
					},
					// 解决兼容性问题
					'postcss-loader',
					// sass-loader解析.scss文件
					'sass-loader'
				]
			},
			{
				// 处理字体文件
				test: /\.(eot|ttf|woff|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name]_[hash:8].[ext]',
						outputPath: 'fonts/'
					}
				}
			},
			{
				test: /\.m?js$/,
				include: srcPath,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', // 转换桥梁
					options: {
						// presets: [
						// 	[
						// 		'@babel/preset-env', // 将高版本ES语法转换为ES5语法
						// 		{
						// 			// 目标浏览器版本
						// 			// targets: {
						// 			// 	chrome: '67'
						// 			// },
						// 			useBuiltIns: 'usage', // 是否引入垫片--只会引入用到的高版本语法的垫片 不会全量引入 垫片会污染全局环境
						// 			corejs: '3.20.2' // 垫片版本
						// 		}
						// 	]
						// ]
						plugins: [['@babel/plugin-transform-runtime']] // 不会污染全局环境
					}
				}
			}
		]
	},
	plugins: [
		// 将打包出来的js加载到相应的html上
		new HtmlWebpackPlugin({
			template: path.join(srcPath, 'index.html')
		}),
		// 每次打包前清除上一次打包的结果
		new CleanWebpackPlugin(),
		// 热更新
		// css热更新不需要写额外的代码 => css-loader内置了相应的热更新的代码
		// js需要写相应支持热更新的的代码
		new webpack.HotModuleReplacementPlugin()
	],
	// source-map 映射关系 example: 映射dist目录下main.js文件96行实际对应的是src目录下index.js文件的第一行
	// source-map常见配置关键字含义
	// inline: 映射关系会直接打包到构建产物中，不会单独生成一个xxx.js.map文件
	// cheap: 1.映射精确到行 而不是某行某列 2.映射只针对项目中编写的代码，不映射引入的三方库
	// module: 映射关系包含引入的三方库
	// eval: 打包后的模块都使用eval()执行，行映射可能不准；不产生独立的 map 文件
	// 开发环境推荐 cheap-module-eval-source-map|线上调试推荐 cheap-module-source-map
	devtool: 'cheap-module-eval-source-map',
	// webpack-dev-server的配置项
	devServer: {
		contentBase: distPath, // 服务器根路径 默认会启动在output.path下
		port: 300, // 设置端口号
		progress: true, // 显示打包的进度条
		compress: true, // 启动 gzip 压缩
		open: true, // 服务器启动后打开浏览器
		hot: true, // 使用Hot Module Replacement
		// hotOnly: false, // 默认值false 通常推荐设置为false 设置为true时 即使Hot Module Replacement不生效 浏览器也不自动刷新页面
		// 设置代理
		proxy: {
			// 将本地 /api/xxx 代理到 localhost:3000/api/xxx
			'/api': 'http://localhost:3000',
			// 将本地 /api2/xxx 代理到 localhost:3000/xxx
			'/api2': {
				target: 'http://localhost:3000',
				pathRewrite: {
					'/api2': ''
				}
			}
		}
	}
};
