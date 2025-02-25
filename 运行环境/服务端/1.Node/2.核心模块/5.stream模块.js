const fs = require('fs');
const { Duplex, Transform } = require('stream');

// 创建可读流（Readable）
// const readableStream = fs.createReadStream('./assets/file.txt', 'utf8');
// // 监听 data 事件
// readableStream.on('data', chunk => {
// 	console.log(`Received chunk: ${chunk}`);
// });
// // 监听 end 事件
// readableStream.on('end', () => {
// 	console.log('No more data to read.');
// });
// // 监听 error 事件
// readableStream.on('error', err => {
// 	console.error('Error:', err);
// });

// 创建可写流（Writable）
// const writableStream = fs.createWriteStream('./assets/output.txt');
// // 写入数据
// writableStream.write('Hello, World!\n');
// writableStream.write('This is a test.\n');
// // 结束写入
// writableStream.end();
// // 监听 finish 事件
// writableStream.on('finish', () => {
// 	console.log('Data has been written.');
// });
// // 监听 error 事件
// writableStream.on('error', err => {
// 	console.error('Error:', err);
// });

// 自定义双工流（Duplex）
// 自定义双工流类
class MyDuplexStream extends Duplex {
	constructor(options) {
		super(options); // 调用父类构造函数
		this.data = []; // 初始化数据存储数组
	}

	// 实现 _read 方法，用于从流中读取数据
	_read(size) {
		if (this.data.length === 0) {
			this.push(null); // 如果没有数据可读，结束流
		} else {
			this.push(this.data.shift()); // 从数组中取出数据并推入流
		}
	}

	// 实现 _write 方法，用于向流中写入数据
	_write(chunk, encoding, callback) {
		this.data.push(chunk); // 将数据存储到数组中
		callback(); // 调用回调函数，表示写入完成
	}
}

// 创建双工流实例
const duplexStream = new MyDuplexStream();

// 监听 data 事件，当有数据可读时触发
duplexStream.on('data', chunk => {
	console.log(`Received: ${chunk.toString()}`); // 打印接收到的数据
});

// 向双工流写入数据
duplexStream.write('Hello'); // 写入 "Hello"
duplexStream.write('World'); // 写入 "World"

// 结束双工流
duplexStream.end(); // 表示没有更多数据写入

// 自定义转换流（Transform）
const upperCaseTransform = new Transform({
	transform(chunk, encoding, callback) {
		const transformedChunk = chunk.toString().toUpperCase(); // 转换为大写
		this.push(transformedChunk); // 推送转换后的数据
		callback();
	}
});

// 使用转换流
upperCaseTransform.on('data', chunk => {
	console.log(`Transformed: ${chunk.toString()}`);
});

upperCaseTransform.write('hello');
upperCaseTransform.write('world');
upperCaseTransform.end();
