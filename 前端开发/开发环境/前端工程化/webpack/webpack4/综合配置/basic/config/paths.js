const path = require('path');

// 源代码目录
const srcPath = path.join(__dirname, '../src');
// 构建产物目录
const distPath = path.join(__dirname, '../dist');

module.exports = {
	srcPath,
	distPath
};
