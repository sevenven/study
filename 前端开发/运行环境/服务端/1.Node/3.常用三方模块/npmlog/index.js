const log = require('npmlog');

// 设置日志级别和前缀
log.level = 'verbose';
log.heading = 'seven';

// 记录一些日志
log.error('error', 'This is an error message');
log.warn('warn', 'This is a warning message');
log.info('info', 'This is an info message');
log.http('http', 'This is an http message');
log.verbose('verbose', 'This is a verbose message');
log.silly('silly', 'This is a silly message');
