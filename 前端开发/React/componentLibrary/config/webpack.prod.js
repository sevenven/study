const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	output: {
		path: path.resolve(process.cwd(), 'dist'),
		filename: 'index.js',
		libraryTarget: 'umd', // 通用模块定义
		globalObject: 'this' // 兼容 Node 和浏览器环境
	},
	externals: {
		// 外部化依赖，避免打包到组件库中
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react',
			root: 'React'
		},
		'react-dom': {
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'react-dom',
			root: 'ReactDOM'
		},
		antd: 'antd'
	}
});
