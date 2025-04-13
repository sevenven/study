'use strict';

// 内置依赖
const fs = require('fs');
const os = require('os');
const path = require('path');

// 三方依赖
const colors = require('colors/safe');
const dotenv = require('dotenv');
const semver = require('semver');
const commander = require('commander');

// 项目依赖
const pkg = require('../package.json');
const { log, npmUtils } = require('@cli/utils');
const { LOWEST_NODE_VERSION, DEFAULT_CLI_HOME } = require('./constants');
const { initProject } = require('@cli/commands');
const exec = require('./exec');

const userHome = os.homedir(); // 获取用户主目录
const program = new commander.Command();
let config = {}; // 全局配置对象

// 核心业务逻辑
async function core() {
	try {
		registerCommand();
		await program.parseAsync(process.argv); // 使用异步解析
	} catch (error) {
		log.error('命令执行失败', error.message);
		process.exitCode = 1; // 标准化退出码设置
		if (process.env.LOG_LEVEL === 'verbose') {
			console.error(error.stack); // 输出完整堆栈
		}
	}
}

function registerCommand() {
	// 命令注册前置配置
	program
		.name(pkg.name.split('/')[1])
		.usage('<command> [options]') // 标准化选项写法
		.version(pkg.version, '-v, --version', '输出版本号')
		.helpOption('-h, --help', '显示帮助信息')
		.option('-d, --debug', '开启调试模式', false)
		.option('-tp, --targetPath <targetPath>', '指定本地调试目录', '')
		.allowUnknownOption(false) // 禁止未知选项
		.showHelpAfterError(); // 错误后显示帮助

	// 调试选项处理
	program.on('option:debug', function () {
		if (this.opts().debug) {
			process.env.LOG_LEVEL = 'verbose';
			log.level = 'verbose';
			log.verbose('调试模式已激活');
		}
	});

	// init命令增强
	program.command('init <project-name>').description('初始化新项目').option('-f, --force', '覆盖已有目录').action(exec);
	// .action(async (projectName, options) => {
	// 	try {
	// 		// 合并全局选项和命令选项
	// 		const globalOptions = program.opts();
	// 		const commandOptions = {
	// 			...options,
	// 			targetPath: globalOptions.targetPath,
	// 			debug: globalOptions.debug
	// 		};

	// 		// log.verbose('开始项目初始化', projectName);
	// 		// log.verbose('命令选项：', commandOptions);
	// 		await initProject(projectName, commandOptions);
	// 	} catch (e) {
	// 		log.error('项目初始化失败', e.message);
	// 		process.exitCode = 1;
	// 	}
	// });

	program.on('option:targetPath', function () {
		const targetPath = this.opts().targetPath;
		if (targetPath) {
			process.env.CLI_TARGET_PATH = targetPath;
		}
	});

	// 全局钩子优化
	program
		.hook('preAction', async command => {
			try {
				await sequentialCheck([checkPkgVersion, checkNodeVersion, checkUserHome, checkRoot, checkEnv, checkGlobalUpdate]);
			} catch (e) {
				log.error('前置检查失败', e.message);
				command.error(e, { exitCode: 1 }); // 使用Commander错误处理
			}
		})
		.hook('postAction', command => {
			log.verbose(`命令 [${command.name()}] 执行完成`);
		});

	// 增强帮助信息
	program.addHelpText(
		'after',
		`
示例:
  $ ${program.name()} init my-project
  $ ${program.name()} init my-project --force
  `
	);
}

// 辅助函数：顺序执行检查
async function sequentialCheck(checkList) {
	for (const check of checkList) {
		await (typeof check === 'function' ? check() : check);
	}
}

// 输出当前版本号
function checkPkgVersion() {
	log.notice('cli', pkg.version);
}

// 检查 node 版本号是否满足要求
function checkNodeVersion() {
	const currentVersion = process.version;
	const lowestVersion = LOWEST_NODE_VERSION;
	if (!semver.gte(currentVersion, lowestVersion)) {
		throw new Error(colors.red(`cli 需要安装 v${lowestVersion} 以上版本的 Node.js`));
	}
}

// 检查用户主目录是否存在
// 1. 环境依赖
//    - 脚手架需要在用户主目录存储配置文件
//    - 依赖包可能需要在用户目录缓存数据
// 2. 权限验证
//    - 确保当前用户有合法的主目录
//    - 验证用户对主目录的读写权限
// 3. 运行环境
//    - 避免在异常环境下运行导致的错误
//    - 保证后续操作的正常进行
function checkUserHome() {
	if (!userHome || !fs.existsSync(userHome)) {
		throw new Error(colors.red('当前登录用户主目录不存在！'));
	}
}

// 检查并加载环境变量
async function checkEnv() {
	try {
		const dotenvPath = path.resolve(userHome, '.env');
		if (fs.existsSync(dotenvPath)) {
			await dotenv.config({ path: dotenvPath });
			log.verbose('环境变量配置', '成功加载环境变量文件');
		}

		config = createDefaultConfig();
		log.verbose('CLI配置信息', config);

		return config;
	} catch (error) {
		throw new Error(`环境变量初始化失败：${error.message}`);
	}
}

// 创建默认配置
function createDefaultConfig() {
	const cliConfig = {
		home: userHome, // 用户主目录
		cliHome: '' // 脚手架工作目录
	};

	// 设置脚手架工作目录
	cliConfig.cliHome = process.env.CLI_HOME ? path.join(userHome, process.env.CLI_HOME) : path.join(userHome, DEFAULT_CLI_HOME);

	// 确保目录存在
	if (!fs.existsSync(cliConfig.cliHome)) {
		fs.mkdirSync(cliConfig.cliHome, { recursive: true });
		log.verbose('创建目录', `${cliConfig.cliHome} 创建成功`);
	}

	// 写入环境变量
	process.env.CLI_HOME_PATH = cliConfig.cliHome;

	return cliConfig;
}

// 检查是否需要全局更新
async function checkGlobalUpdate() {
	const currentVersion = pkg.version;
	const npmName = pkg.name;

	log.verbose('检查更新', `当前版本：${currentVersion}，模块名：${npmName}`);

	try {
		// 修改导入路径和方式
		const lastVersion = await npmUtils.getNpmLatestVersion(npmName);

		if (lastVersion && semver.gt(lastVersion, currentVersion)) {
			log.warn(
				colors.yellow(`请手动更新 ${npmName}，当前版本：${currentVersion}，最新版本：${lastVersion}
                更新命令：npm install -g ${npmName}`)
			);
		}
	} catch (error) {
		log.verbose('检查更新失败', error.message);
	}
}

// root 降级
// 1. 安全性考虑
//    - 避免 root 权限带来的系统文件修改风险
//    - 防止特权操作导致的安全隐患
//    - 规避某些 npm 包在 root 权限下的异常问题
// 2. 最小权限原则
//    - 脚手架只需要普通用户权限即可正常运行
//    - 遵循最小权限原则，减少安全风险
// 3. npm 最佳实践
//    - 符合 npm 官方建议，避免使用 root 权限 确保所有依赖包在普通权限下正常运行
async function checkRoot() {
	const rootCheck = await import('root-check');
	rootCheck.default();
}

module.exports = core;
