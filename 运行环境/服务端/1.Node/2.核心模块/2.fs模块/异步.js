const fs = require('fs'); // 引入文件系统模块
const path = require('path'); // 引入路径模块

// 文件操作示例
// 定义文件路径
const filePath = path.join(__dirname, '../assets/file.txt');

// 写入文件
fs.writeFile(filePath, 'Hello, world!', err => {
	if (err) throw err; // 如果写入失败，抛出错误
	console.log('文件已成功写入');

	// 读取文件
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) throw err; // 如果读取失败，抛出错误
		console.log('文件内容:', data);

		// 追加内容到文件
		fs.appendFile(filePath, '\n这是追加的内容', err => {
			if (err) throw err; // 如果追加失败，抛出错误
			console.log('内容已成功追加');

			// 再次读取文件以查看更改
			fs.readFile(filePath, 'utf8', (err, updatedData) => {
				if (err) throw err; // 如果读取失败，抛出错误
				console.log('更新后的文件内容:', updatedData);

				// 获取文件状态
				fs.stat(filePath, (err, stats) => {
					if (err) throw err; // 如果获取状态失败，抛出错误
					console.log('文件状态:', stats);

					// 检查文件是否存在
					fs.access(filePath, fs.constants.F_OK, err => {
						if (err) {
							console.error('文件不存在'); // 如果文件不存在，输出错误
						} else {
							console.log('文件存在');

							// 删除文件
							fs.unlink(filePath, err => {
								if (err) throw err; // 如果删除失败，抛出错误
								console.log('文件已成功删除');
							});
						}
					});
				});
			});
		});
	});
});

// 目录操作示例
const dirPath = path.join(__dirname, 'newDirectory');

// 创建目录
fs.mkdir(dirPath, { recursive: true }, err => {
	if (err) throw err; // 如果创建目录失败，抛出错误
	console.log('目录已成功创建');

	// 读取目录内容
	fs.readdir(dirPath, (err, files) => {
		if (err) throw err; // 如果读取目录失败，抛出错误
		console.log('目录内容:', files);

		// 删除目录
		fs.rmdir(dirPath, err => {
			if (err) throw err; // 如果删除目录失败，抛出错误
			console.log('目录已成功删除');
		});
	});
});
