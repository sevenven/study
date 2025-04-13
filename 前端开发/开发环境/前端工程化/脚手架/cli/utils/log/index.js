'use strict';

const log = require('npmlog');

// 判断 debug 模式，设置日志等级
// log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'; // 删除静态初始化
// 改为动态获取方法
Object.defineProperty(log, 'level', {
	get() {
		return process.env.LOG_LEVEL || 'info'; // 每次获取都读取环境变量
	},
	set(value) {
		process.env.LOG_LEVEL = value; // 保持与env同步
	}
});

// 其他代码保持不变...

// 添加自定义命令 success (权重：2000，样式：绿色加粗)，用于输出成功日志
log.addLevel('success', 2000, { fg: 'green', bold: true });

// 修改前缀
log.heading = 'cli';

// 自定义前缀样式（前景色：蓝色，背景色：黑色）
log.headingStyle = { fg: 'blue', bg: 'black' };

module.exports = log;
