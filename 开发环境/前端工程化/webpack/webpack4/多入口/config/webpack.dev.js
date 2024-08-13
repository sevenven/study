const webpack = require('webpack');
const webpackCommonConf = require('./webpack.common.js');
const { smart } = require('webpack-merge');
const { srcPath, distPath } = require('./paths.js');

module.exports = smart(webpackCommonConf, {
	mode: 'development',
	output: {
		path: distPath, // 打包产物存放路径
		// publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
		filename: '[name].[hash:8].js' // name 即多入口时 entry 的 key
		// chunkFilename: '[name].[hash:8].js'
	},
	module: {
		rules: [
			// 直接引入图片 url
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			ENV: JSON.stringify('development')
		})
	],
	devServer: {
		port: 8080,
		progress: true, // 显示打包的进度条
		contentBase: distPath, // 根目录
		open: true, // 自动打开浏览器
		compress: true, // 启动 gzip 压缩
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
});
