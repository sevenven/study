#!/usr/bin/env node

const importLocal = require('import-local');

// 尝试导入本地的模块
if (importLocal(__filename)) {
	console.log('使用了本地安装的模块');
	return;
}

// 如果本地没有安装该模块，则继续执行全局安装的模块逻辑
console.log('使用了全局安装的模块');
// 这里可以添加全局模块的主要逻辑，例如引入并执行核心功能
const myModule = require('../lib');
myModule(__filename);
