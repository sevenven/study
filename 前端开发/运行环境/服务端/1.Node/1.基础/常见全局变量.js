// __dirname: 输出当前脚本文件所在的目录路径。
console.log('__dirname:', __dirname);
// __filename: 输出当前脚本文件的完整绝对路径。
console.log('__filename:', __filename);
// module: 显示当前模块的所有信息，包括模块的标识符、导出对象等。
console.log('module:', module);
// exports: 通过 exports 导出数据，可以在其他模块中通过 require 引入。
exports.hello = 'Hello, world!';
// global: 可以用来定义全局变量，但应谨慎使用。
global.myGlobalVar = 'I am a global variable';
console.log('Global Variable:', myGlobalVar);
// process: 提供了许多系统级别的信息和方法，如进程ID、工作目录、环境变量等。
// 获取 process 对象的一些属性
console.log('Process ID:', process.pid);
console.log('Current Working Directory:', process.cwd());
console.log('Environment Variables:', process.env);
// process.nextTick: 用于在下一个事件循环迭代中执行回调函数，常用于需要立即执行但又不想阻塞 I/O 操作的情况。
process.nextTick(() => {
	console.log('This will run in the next event loop iteration.');
});
