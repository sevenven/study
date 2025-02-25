const util = require('util');
const fs = require('fs');

// 使用 util.format 格式化字符串
console.log(util.format('%s:%s', 'foo', 'bar')); // 输出: foo:bar

// 使用 util.debuglog 创建调试函数
const debuglog = util.debuglog('example');
debuglog('This is an example debug message'); // 设置 NODE_DEBUG=example 后会输出: EXAMPLE 3875: This is an example debug message

// 使用 util.promisify 将传统回调函数转换为 Promise
// const readFile = util.promisify(fs.readFile);
// async function readMyFile() {
// 	try {
// 		const data = await readFile(__filename);
// 		console.log(data.toString());
// 	} catch (err) {
// 		console.error(err);
// 	}
// }
// readMyFile();

// 使用 util.inspect 查看对象结构
const obj = { a: 1, b: [2, 3], c: { d: 4 } };
console.log(util.inspect(obj)); // 输出: { a: 1, b: [ 2, 3 ], c: { d: 4 } }

// 自定义 inspect 方法
class Box {
	constructor(content) {
		this.content = content;
	}

	[util.inspect.custom](depth, options) {
		return `Box[${this.content}]`;
	}
}
const box = new Box('秘密');
console.log(box); // 输出: Box[秘密]
