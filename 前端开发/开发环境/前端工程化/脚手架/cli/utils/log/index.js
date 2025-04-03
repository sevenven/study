'use strict';

const log = require('npmlog');

// 判断 debug 模式，设置日志等级
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';

// 添加自定义命令 success (权重：2000，样式：绿色加粗)，用于输出成功日志
log.addLevel('success', 2000, { fg: 'green', bold: true });

// 修改前缀
log.heading = 'cli';

// 自定义前缀样式（前景色：蓝色，背景色：黑色）
log.headingStyle = { fg: 'blue', bg: 'black' };

module.exports = log;
