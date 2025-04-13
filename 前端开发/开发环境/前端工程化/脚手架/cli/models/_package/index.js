'use strict';

const { isObject, log, formatPath } = require('@cli/utils');
const path = require('path');
const fs = require('fs');
const pkgDir = require('pkg-dir');
const { npmUtils } = require('../../utils');

class Package {
	constructor(options) {
		if (!options) {
			throw new Error('Package 类的 options 参数不能为空！');
		}
		if (!isObject(options)) {
			throw new Error('Package 类的 options 参数必须为对象类型！');
		}

		this.targetPath = formatPath(options.targetPath); // 路径格式化
		this.storeDir = formatPath(options.storeDir || '');
		this.packageName = options.packageName;
		this.packageVersion = options.packageVersion;
	}

	install() {
		npmUtils.install({
			root: this.targetPath,
			storeDir: this.storeDir,
			registry: npmUtils.getNpmRegistry(),
			packageName: this.packageName,
			packageVersion: this.packageVersion
		});
	}

	async getRootFilePath() {
		try {
			// 检查目标路径是否存在
			if (!fs.existsSync(this.targetPath)) {
				return null;
			}
			// 查找最近的包含 package.json 的目录
			const dir = await pkgDir(this.targetPath);
			if (!dir) {
				return null;
			}

			// 获取并解析 package.json 文件
			const pkgPath = path.resolve(dir, 'package.json');
			const pkgFile = require(pkgPath);

			// 检查并返回入口文件路径
			if (!pkgFile || !pkgFile.main) {
				return null;
			}
			log.verbose('入口文件:', formatPath(path.resolve(dir, pkgFile.main)));
			return formatPath(path.resolve(dir, pkgFile.main));
		} catch (error) {
			log.error('获取入口文件失败:', error.message);
			return null;
		}
	}
}

module.exports = Package;
