const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
	// mode: 'production' 下的一些常用默认配置
	mode: 'production',
	devtool: 'cheap-module-source-map'
};

module.exports = merge(commonConfig, prodConfig);
