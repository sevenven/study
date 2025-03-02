const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.join(__dirname, './', 'src');
const distPath = path.join(__dirname, '/.', 'dist');
const templatePath = path.join(__dirname, './', 'template');

const makePlugins = configs => {
	const plugins = [];
	plugins.push(new CleanWebpackPlugin()); // 每次打包前清除上一次打包的结果
	Object.keys(configs.entry).forEach(item => {
		plugins.push(
			new HtmlWebpackPlugin({
				template: path.join(templatePath, `${item}.html`),
				filename: `${item}.html`,
				chunks: [item, 'runtime', 'vendors', 'common'] // // 考虑codeSplit
			})
		);
	});
	return plugins;
};

const configs = {
	mode: 'development',
	entry: {
		index: path.join(srcPath, 'index.js'),
		other: path.join(srcPath, 'other.js')
	},
	output: {
		path: distPath, // 打包产物存放路径
		filename: '[name].[hash:8].js' // name 即多入口时 entry 的 key
	}
};

configs.plugins = makePlugins(configs);

module.exports = configs;
