const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const { distPath } = require('./paths');

const devConfig = {
	mode: 'development',
	plugins: [
		// 热更新
		// css热更新不需要写额外的代码 => css-loader内置了相应的热更新的代码
		// js需要写相应支持热更新的的代码
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		usedExports: true
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: distPath, // 服务器根路径 默认会启动在output.path下
		port: 3000, // 设置端口号
		open: true, // 服务器启动后打开浏览器
		hot: true // 使用Hot Module Replacement 配置中需要有webpack.HotModuleReplacementPlugin
		// hotOnly: false, // 默认值false 通常推荐设置为false 设置为true时 即使Hot Module Replacement不生效 浏览器也不自动刷新页面
		// progress: true, // 显示打包的进度条
		// compress: true, // 启动 gzip 压缩
		// 设置代理
		// proxy: {
		// 	// 将本地 /api/xxx 代理到 'http://localhost:3000/api/xxx
		// 	'/api': 'http://localhost:3000',
		// 	// 将本地 /api2/xxx 代理到 'http://localhost:3000/xxx
		// 	'/api2': {
		// 		target: 'http://localhost:3000',
		// 		pathRewrite: {
		// 			'/api2': ''
		// 		}
		// 	}
		// }
	}
};

module.exports = merge(commonConfig, devConfig);
