const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

const plugins = [
	new HtmlWebpackPlugin({
		template: 'src/index.html'
	}),
	new CleanWebpackPlugin(['dist'], {
		root: path.resolve(__dirname, '../')
	})
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
	if (/.*\.dll.js/.test(file)) {
		plugins.push(
			new AddAssetHtmlWebpackPlugin({
				filepath: path.resolve(__dirname, '../dll', file)
			})
		);
	}
	if (/.*\.manifest.json/.test(file)) {
		plugins.push(
			new webpack.DllReferencePlugin({
				manifest: path.resolve(__dirname, '../dll', file)
			})
		);
	}
});

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, '../src'), // 只有src文件夹下的代码才使用相应的loader
				// exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name]_[hash].[ext]',
						outputPath: 'images/',
						limit: 10240
					}
				}
			},
			{
				test: /\.(eot|ttf|svg)$/,
				use: {
					loader: 'file-loader'
				}
			}
		]
	},
	plugins,
	performance: false, // 不显示打包过程中的性能问题
	// 按需配置 不要过度配置
	resolve: {
		extensions: ['.js', '.jsx'], // 当引入的模块无后缀时 尝试按配置顺序补全模块后缀寻找 会耗费性能
		mainFiles: ['index'], // 默认是读取一个文件夹下name为index的文件
		alias: {
			child: path.resolve(__dirname, '../src/a/b/c/child') // 定义child包路径
		}
	},
	optimization: {
		usedExports: true,
		runtimeChunk: {
			name: 'runtime'
		},
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					name: 'vendors'
				}
			}
		}
	}
};
