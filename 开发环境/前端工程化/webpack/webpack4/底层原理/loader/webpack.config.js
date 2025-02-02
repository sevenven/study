const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	resolveLoader: {
		modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'loader')] // 先到node_modules目录下去寻找loader 再到loader目录下去寻找
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						// loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
						loader: 'replaceLoader',
						options: {
							name: 'seven'
						}
					},
					{
						loader: 'replaceLoaderAsync'
					}
				]
			}
		]
	}
};
