const path = require('path');

module.exports = {
	mode: 'development', // 默认 'production'
	//entry: './src/index.js',
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	}
};
