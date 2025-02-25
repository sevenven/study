const path = require('path');

// 解析路径
console.log(path.parse('E:\\study\\运行环境\\服务端\\Node\\file.txt'));

// 格式化路径
console.log(
	path.format({
		root: 'E:\\',
		dir: 'E:\\study\\运行环境\\服务端\\Node',
		base: 'file.txt',
		ext: '.txt',
		name: 'file'
	})
);

// 获取文件扩展名
console.log(path.extname('file.txt'));

// 获取文件名
console.log(path.basename('file.txt'));

// 获取目录名
console.log(path.dirname('E:\\study\\运行环境\\服务端\\Node\\file.txt'));

// 连接路径片段
console.log(path.join('E:\\study\\运行环境\\服务端\\Node', 'file.txt'));
