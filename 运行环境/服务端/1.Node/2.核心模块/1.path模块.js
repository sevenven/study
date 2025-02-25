const path = require('path'); // 引入路径模块

// 定义一个文件路径
const filePath = 'E:\\study\\运行环境\\服务端\\Node\\核心模块\\2.path模块.js';

// 输出原始文件路径
console.log(`File path: ${filePath}`);

// 获取文件路径的目录名
console.log(`Directory name: ${path.dirname(filePath)}`);

// 获取文件路径的文件名（包含扩展名）
console.log(`Base name: ${path.basename(filePath)}`);

// 获取文件路径的扩展名
console.log(`Extension name: ${path.extname(filePath)}`);

// 检查路径是否为绝对路径
console.log(`Is absolute? ${path.isAbsolute(filePath)}`);

// 规范化路径（去除多余的斜杠和相对路径符号）
console.log(`Normalized path: ${path.normalize(filePath)}`);

// 解析路径为对象，包含 root、dir、base、ext、name 等属性
const parsedPath = path.parse(filePath);
console.log('Parsed path:', parsedPath);

// 将解析后的路径对象重新格式化为路径字符串
const formattedPath = path.format(parsedPath);
console.log(`Formatted path: ${formattedPath}`);
