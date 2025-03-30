#!/usr/bin/env node

const importLocal = require('import-local');
const { log } = require('@cli/utils');

(async () => {
	try {
		// 优先使用本地版本
		if (importLocal(__filename)) {
			log.info('正在使用本地版本');
		} else {
			// 执行全局版本
			log.info('正在使用全局版本');
			await require('../lib')(process.argv.slice(2));
		}
	} catch (error) {
		log.error('cli', error.message);
		if (process.env.LOG_LEVEL === 'verbose') {
			console.error(error);
		}
		process.exit(1);
	}
})();
