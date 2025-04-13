'use strict';

const { Package } = require('@cli/models');
const { log } = require('@cli/utils');
const path = require('path');

const SETTINGS = {
	core: '@cli/core'
};

const CACHE_DIR = 'dependencies/';

async function exec() {
	// 获取环境变量
	const targetPath = process.env.CLI_TARGET_PATH;
	const homePath = process.env.CLI_HOME_PATH;

	// 获取命令对象和参数
	const cmdObj = arguments[arguments.length - 1];
	const cmdName = cmdObj.name();
	const packageName = SETTINGS[cmdName];
	const packageVersion = 'latest';

	// 检查目标路径
	if (!targetPath) {
		throw new Error('缺少目标路径参数');
	}
	// 生成缓存目录
	const storeDir = path.resolve(homePath, CACHE_DIR);

	try {
		// 实例化 Package 对象
		const pkg = new Package({
			targetPath,
			storeDir,
			packageName,
			packageVersion
		});

		// 获取入口文件路径
		const rootFile = await pkg.getRootFilePath();
		if (!rootFile) {
			throw new Error(`命令 ${packageName} 的入口文件不存在`);
		}
		log.verbose('命令入口文件:', rootFile);
	} catch (error) {
		log.error('命令执行失败:', error.message);
	}
}

module.exports = exec;
