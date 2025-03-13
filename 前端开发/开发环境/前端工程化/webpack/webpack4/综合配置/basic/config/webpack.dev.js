const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const { distPath } = require('./paths');

module.exports = merge(commonConfig, {
	// 开发模式
	mode: 'development',
	output: {
		filename: 'js/[name].js', // 开发环境使用 name 而不是 contenthash
		chunkFilename: 'js/[name].chunk.js'
	},
	// 开发环境推荐的 source map 配置
	devtool: 'cheap-module-eval-source-map',
	// 开发服务器配置
	devServer: {
		contentBase: distPath, // 服务器根路径 默认会启动在output.path下
		open: true, // 自动打开浏览器
		port: 8080, // 端口
		hot: true, // 开启热更新
		hotOnly: true, // 热更新失败时不刷新页面
		compress: true, // 启用 gzip 压缩
		historyApiFallback: true, // 支持 history 路由
		// 接口代理配置
		proxy: {
			// 将本地 /api/xxx 代理到 'http://localhost:3000/api/xxx
			// '/api': 'http://localhost:3000',
			// 将本地 /api/xxx 代理到 'http://localhost:3000/xxx
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {
					'^/api': ''
				},
				changeOrigin: true
			}
		}
	},
	plugins: [
		// 热模块替换插件
		new webpack.HotModuleReplacementPlugin()
	]
});
