const { exec, spawn, fork, execFile, execSync, spawnSync } = require('child_process'); // 引入子进程模块

// 查看系统默认编码
// exec('chcp', (error, stdout, stderr) => {
// 	if (error) {
// 		console.error(`Error: ${error.message}`);
// 		return;
// 	}
// 	if (stderr) {
// 		console.error(`Stderr: ${stderr}`);
// 		return;
// 	}
// 	console.log(`Active code page: ${stdout}`);
// });

// 1. 使用 exec 执行命令并缓冲输出
// const command = process.platform === 'win32' ? 'dir' : 'ls -lh';
// exec(command, (error, stdout, stderr) => {
// 	if (error) {
// 		console.error(`Error executing command: ${error.message}`);
// 		return;
// 	}
// 	if (stderr) {
// 		console.error(`Command output error: ${stderr}`);
// 		return;
// 	}
// 	console.log(`Command output:\n${stdout}`);
// });

// 2. 使用 spawn 启动一个新的进程
// const ls = spawn('cmd.exe', ['/c', 'dir']); // 使用 cmd.exe 并传递 /c 参数来执行 dir 命令
// ls.stdout.on('data', data => {
// 	console.log(`Spawn stdout:\n${data}`);
// });
// ls.stderr.on('data', data => {
// 	console.error(`Spawn stderr: ${data}`); // 监听标准错误
// });
// ls.on('close', code => {
// 	console.log(`Spawn process exited with code ${code}`); // 监听进程退出事件
// });

// 3. 使用 fork 启动一个新的 Node.js 进程
// const child = fork('./child.js'); // 创建子进程，执行 'child.js' 文件
// child.send({ hello: 'world' }); // 向子进程发送消息
// child.on('message', msg => {
// 	console.log('Message from child:', msg); // 监听子进程发送的消息
// });
// child.on('close', code => {
// 	console.log(`Child process exited with code ${code}`); // 监听子进程退出事件
// });

// 4. 使用 execFile 直接执行可执行文件
// execFile('node', ['--version'], (error, stdout, stderr) => {
// 	if (error) {
// 		console.error(`Error executing file: ${error.message}`); // 输出错误信息
// 		return;
// 	}
// 	if (stderr) {
// 		console.error(`File output error: ${stderr}`); // 输出标准错误信息
// 		return;
// 	}
// 	console.log(`File output:\n${stdout}`); // 输出标准输出信息
// });

// 5. 使用 execSync 同步执行命令
// try {
// 	const stdout = execSync('echo Hello, world!'); // 同步执行命令
// 	console.log(`ExecSync output:\n${stdout.toString()}`); // 输出标准输出信息
// } catch (error) {
// 	console.error(`Error executing sync command: ${error.message}`); // 输出错误信息
// }

// 6. 使用 spawnSync 同步启动一个新的进程
try {
	const result = spawnSync('cmd.exe', ['/c', 'dir']); // 同步创建子进程，执行 'dir' 命令
	console.log(`SpawnSync stdout:\n${result.stdout.toString()}`); // 输出标准输出信息
} catch (error) {
	console.error(`Error spawning sync process: ${error.message}`); // 输出错误信息
}
