const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcPath, templatePath } = require('./paths');

module.exports = {
	entry: {
		index: path.join(srcPath, 'index.js'),
		other: path.join(srcPath, 'other.js')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: ['babel-loader'],
				include: srcPath,
				exclude: /node_modules/
			},
			{
				test: /\.(css|scss)$/,
				// loader 的执行顺序是：从后往前
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
				test: /\.less$/,
				// 增加 'less-loader' ，注意顺序
				loader: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
			}
		]
	},
	plugins: [
		// 多入口 - 生成 index.html
		new HtmlWebpackPlugin({
			template: path.join(templatePath, 'index.html'),
			filename: 'index.html',
			// chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
			chunks: ['index'] // 只引用 index.js
		}),
		// 多入口 - 生成 other.html
		new HtmlWebpackPlugin({
			template: path.join(templatePath, 'other.html'),
			filename: 'other.html',
			chunks: ['other'] // 只引用 other.js
		})
	]
};
