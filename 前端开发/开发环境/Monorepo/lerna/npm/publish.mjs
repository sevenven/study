/*author:huyulin*/
// 导入所需的模块
import fs from 'fs'; // 文件系统模块，用于读写文件
import path from 'path'; // 路径处理模块，用于处理文件路径
import { fileURLToPath } from 'url'; // 将文件 URL 转换为文件路径
import child_process from 'child_process'; // 子进程模块，用于执行 shell 命令
import { Worker, isMainThread, workerData, parentPort } from 'node:worker_threads'; // 多线程模块，用于并发执行任务

// 同步执行 shell 命令
const exec = child_process.execSync;

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);

// 获取当前文件所在目录的路径
const rootPath = path.dirname(__filename);

// 定义日志文件的路径，文件名包含当前时间戳
const consoleLogPath = path.join(rootPath, `publishLog_${format(getNowTime())}`);

// 定义要发布的包所在的目录（默认为 node_modules）
const modulePath = path.join(rootPath, 'node_modules');

// 读取 modulePath 目录下的所有文件和文件夹
const res = fs.readdirSync(modulePath);

// 定义失败列表、成功列表、包列表和开始时间
let failedList = [],
	successList = [],
	packages = [],
	begin = new Date();

// 获取当前时间的函数
function getNowTime() {
	const d = new Date();
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}:${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
}

// 格式化时间字符串，将特殊字符替换为下划线
function format(timeStr) {
	return timeStr.replace(/[\-\.\:]/g, '_');
}

// 将毫秒数转换为易读的时间格式（天、小时、分钟、秒）
function formatDuring(mss) {
	const days = parseInt(mss / (1000 * 60 * 60 * 24));
	const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = (mss % (1000 * 60)) / 1000;
	return `${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;
}

// 递归搜索需要发布的包
function search(res, consoleLogPath, modulePath) {
	res.forEach(item => {
		const dPath = path.join(modulePath, item); // 当前文件或文件夹的完整路径
		const stat = fs.statSync(dPath); // 获取文件或文件夹的状态信息
		if (stat.isDirectory()) {
			// 如果是目录
			const packageJsonPath = path.join(dPath, 'package.json'); // package.json 的路径
			if (fs.existsSync(packageJsonPath)) {
				// 如果存在 package.json
				const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')); // 读取 package.json
				const name = packageJson.name;
				const version = packageJson.version;
				packages.push({ dPath, name, version });
			}
			const subDir = path.join(dPath, 'node_modules'); // 子目录的 node_modules 路径
			if (fs.existsSync(subDir)) {
				// 如果存在子目录的 node_modules
				const subRes = fs.readdirSync(subDir); // 读取子目录的内容
				search(subRes, consoleLogPath, subDir); // 递归搜索子目录
			} else if (item[0] === '@') {
				// 如果目录名以 @ 开头（如 @scope/package）
				const subRes = fs.readdirSync(dPath); // 读取子目录的内容
				search(subRes, consoleLogPath, dPath); // 递归搜索子目录
			}
		}
	});
}

// 多线程发布函数
function publishbat() {
	let num = 100, // 线程数
		now = 0,
		workers = [];
	if (num > packages.length) num = packages.length; // 如果线程数大于包的数量，调整线程数

	for (let i = 0; i < num; i++) {
		const worker = new Worker(__filename); // 创建工作线程
		worker.on('message', e => {
			if (e !== -1) {
				failedList.push(`包名称：${e.name}@${e.version}\n`); // 记录失败的包名称和版本
			} else {
				successList.push(`包名称：${packages[now - 1].name}@${packages[now - 1].version}\n`); // 记录成功的包名称和版本
			}
			if (now < packages.length) {
				worker.postMessage({
					dPath: packages[now].dPath, // 传递包的路径
					index: now++,
					logPath: consoleLogPath,
					length: packages.length
				});
			} else {
				worker.terminate(); // 终止工作线程
			}
		});

		worker.on('error', e => console.error(e)); // 监听错误
		worker.on('exit', () => {
			num--;
			console.log(`剩余工作线程数：${num}`);
			if (num === 0) {
				const end = new Date();
				console.log(`任务结束：\n共 ${packages.length} 个包：成功/失败：${successList.length}/${failedList.length}\n总耗时：${formatDuring(end - begin)},${end - begin}毫秒,平均任务耗时：${(end - begin) / packages.length}`);
				if (failedList.length > 0) {
					fs.appendFileSync(consoleLogPath, '失败日志列表：\n');
					failedList.forEach((f, i) => {
						fs.appendFileSync(consoleLogPath, `发布失败${i + 1}.${f}`);
					});
				}
				if (successList.length > 0) {
					fs.appendFileSync(consoleLogPath, '成功日志列表：\n');
					successList.forEach((s, i) => {
						fs.appendFileSync(consoleLogPath, `发布成功${i + 1}.${s}`);
					});
				}
			}
		});

		workers.push(worker);
		worker.postMessage({
			dPath: packages[now].dPath, // 传递包的路径
			index: now++,
			logPath: consoleLogPath,
			length: packages.length
		});
	}
}

// 主线程逻辑
if (isMainThread) {
	search(res, consoleLogPath, modulePath); // 搜索需要发布的包
	console.log(`共搜索包${packages.length}个，开始上传`); // 打印搜索到的包数量
	publishbat(); // 启动多线程发布
} else {
	// 工作线程逻辑
	parentPort.on('message', a => {
		const dPath = a.dPath;
		let re = -1;
		const packageJsonPath = path.join(dPath, 'package.json');
		const parsePackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
		const name = parsePackageJson.name;
		const version = parsePackageJson.version;

		if (name) {
			// 如果包名不为空
			console.log(`任务开始：[${a.index}/${a.length}]\n包名称：${name}@${version}\n文件位置：${dPath}`);
			const scripts = parsePackageJson.scripts || {};
			const publishConfig = parsePackageJson.publishConfig || {};

			// 清空 scripts 和 publishConfig
			parsePackageJson.scripts = {};
			parsePackageJson.publishConfig = {};
			fs.writeFileSync(packageJsonPath, JSON.stringify(parsePackageJson));

			try {
				exec(`cd ${dPath} && npm publish --registry http://172.16.19.229:4873/ --loglevel error`); // 执行 npm publish 命令
			} catch (e) {
				console.log(`[${a.index}/${a.length}]包${name}@${version}:发布失败，可能是重复包`);
				re = { name, version }; // 记录失败的包名称和版本
			}

			// 恢复 scripts 和 publishConfig
			parsePackageJson.scripts = scripts;
			parsePackageJson.publishConfig = publishConfig;
			fs.writeFileSync(packageJsonPath, JSON.stringify(parsePackageJson));

			if (re === -1) {
				fs.appendFileSync(a.logPath, `[${a.index}/${a.length}]成功发包->${dPath}：${name}@${version}\n`);
			}
		}
		parentPort.postMessage(re); // 发送返回值给主线程
	});
}
