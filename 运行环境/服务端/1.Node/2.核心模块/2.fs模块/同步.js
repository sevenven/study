const fs = require('fs');
const path = require('path');

// 文件操作示例
try {
	// 定义文件路径
	const filePath = path.join(__dirname, '../assets/file.txt');

	// 写入文件
	fs.writeFileSync(filePath, 'Hello, world!');
	console.log('文件已成功写入');

	// 读取文件
	let data = fs.readFileSync(filePath, 'utf8');
	console.log('文件内容:', data);

	// 追加内容到文件
	fs.appendFileSync(filePath, '\n这是追加的内容');
	console.log('内容已成功追加');

	// 再次读取文件以查看更改
	let updatedData = fs.readFileSync(filePath, 'utf8');
	console.log('更新后的文件内容:', updatedData);

	// 获取文件状态
	let stats = fs.statSync(filePath);
	console.log('文件状态:', stats);

	// 检查文件是否存在
	try {
		fs.accessSync(filePath, fs.constants.F_OK);
		console.log('文件存在');
	} catch (err) {
		console.error('文件不存在');
	}

	// 删除文件
	// fs.unlinkSync(filePath);
	// console.log('文件已成功删除');
} catch (err) {
	console.error(err);
}

// 目录操作示例
// try {
// 	const dirPath = path.join(__dirname, 'newDirectory');

// 	// 创建目录
// 	fs.mkdirSync(dirPath, { recursive: true });
// 	console.log('目录已成功创建');

// 	// 读取目录内容
// 	let files = fs.readdirSync(dirPath);
// 	console.log('目录内容:', files);

// 	// 删除目录
// 	fs.rmdirSync(dirPath);
// 	console.log('目录已成功删除');
// } catch (err) {
// 	console.error(err);
// }
