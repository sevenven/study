const os = require('os');

console.log(`操作系统架构: ${os.arch()}`);
console.log(`操作系统平台: ${os.platform()}`);
console.log(`操作系统类型: ${os.type()}`);
console.log(`操作系统版本: ${os.release()}`);
console.log(`主机名: ${os.hostname()}`);

if (os.loadavg) {
	console.log(`最近1分钟负载: ${os.loadavg()[0]}`);
}

console.log(`总内存: ${os.totalmem()} 字节`);
console.log(`空闲内存: ${os.freemem()} 字节`);

console.log('网络接口:');
console.log(os.networkInterfaces());

console.log(`临时文件夹路径: ${os.tmpdir()}`);

console.log('CPU信息:');
console.log(os.cpus());
