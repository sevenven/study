const fs = require('fs');

// 写入文件
fs.writeFile('file.txt', 'Hello, world!', err => {
	if (err) throw err;
	console.log('File has been saved!');
});

// 读取文件
fs.readFile('file.txt', 'utf8', (err, data) => {
	if (err) throw err;
	console.log(data);
});
