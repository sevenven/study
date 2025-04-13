'use strict';
const path = require('path');

/**
 * 格式化路径
 * @param {string} _path 待格式化的路径
 * @returns {string} 格式化后的路径
 */
function formatPath(_path) {
	// 1. 确保输入的是有效的字符串
	if (_path && typeof _path === 'string') {
		// 2. 获取系统路径分隔符
		const sep = path.sep;
		// 3. 仅在 Windows 系统下进行转换
		if (sep === '\\') {
			_path = _path.replace(/\\/g, '/');
		}
	}

	return _path;
}

module.exports = formatPath;
