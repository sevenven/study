const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							// scss里面使用import引入的文件可以执行哪些loader
							importLoaders: 2 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader&sass-loader
						}
					},
					'sass-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
			}
		]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		})
	],
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	}
};

module.exports = merge(commonConfig, prodConfig);
