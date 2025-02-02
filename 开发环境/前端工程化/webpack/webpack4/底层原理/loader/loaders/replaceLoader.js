const loaderUtils = require('loader-utils');

// source-文件内容
module.exports = function (source) {
	const options = loaderUtils.getOptions(this);
	// 写法一
	// return source.replace('webpack', options.name);
	// 写法二
	this.callback(null, source.replace('webpack', options.name));
};
