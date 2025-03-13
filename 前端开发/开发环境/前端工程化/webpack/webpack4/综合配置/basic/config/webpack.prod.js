const { merge } = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
	// 生产模式
	mode: 'production',
	// 生产环境推荐的 source map 配置
	devtool: 'cheap-module-source-map',
	optimization: {
		minimizer: [
			// JS 代码压缩
			new TerserPlugin({
				parallel: true, // 开启多进程压缩
				cache: true // 开启缓存
			}),
			// CSS 代码压缩
			new OptimizeCssAssetsPlugin()
		]
	}
});
