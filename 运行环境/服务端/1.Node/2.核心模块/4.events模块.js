const EventEmitter = require('events'); // 引入事件模块

// 定义一个自定义事件发射器类
class MyEmitter extends EventEmitter {}

// 创建 MyEmitter 的实例
const myEmitter = new MyEmitter();

// 监听 'greet' 事件，每次触发时执行回调函数
myEmitter.on('greet', name => {
	console.log(`Hello, ${name}!`);
});

// 监听 'welcome' 事件，仅触发一次
myEmitter.once('welcome', name => {
	console.log(`Welcome, ${name}!`);
});

// 触发 'greet' 事件，并传递参数 'Alice'
myEmitter.emit('greet', 'Alice');

// 再次触发 'greet' 事件，并传递参数 'Bob'
myEmitter.emit('greet', 'Bob');

// 触发 'welcome' 事件，并传递参数 'Charlie'
myEmitter.emit('welcome', 'Charlie');

// 再次触发 'welcome' 事件，并传递参数 'David'
myEmitter.emit('welcome', 'David'); // 不会执行，因为 'welcome' 事件只触发一次

// 定义 'goodbye' 事件的回调函数
const goodbyeCallback = name => {
	console.log(`Goodbye, ${name}!`);
};

// 监听 'goodbye' 事件
myEmitter.on('goodbye', goodbyeCallback);

// 触发 'goodbye' 事件，并传递参数 'Eve'
myEmitter.emit('goodbye', 'Eve');

// 移除 'goodbye' 事件的回调函数
myEmitter.off('goodbye', goodbyeCallback);

// 再次触发 'goodbye' 事件，并传递参数 'Frank'
myEmitter.emit('goodbye', 'Frank'); // 不会执行，因为回调函数已被移除

// 获取 'greet' 事件的监听器数量
console.log(myEmitter.listenerCount('greet')); // 输出: 1

// 获取所有已注册的事件名称
console.log(myEmitter.eventNames()); // 输出: [ 'greet' ]

// 获取当前的最大监听器数量
console.log(myEmitter.getMaxListeners()); // 输出: 10（默认值）

// 设置最大监听器数量为 20
myEmitter.setMaxListeners(20);

// 再次获取最大监听器数量
console.log(myEmitter.getMaxListeners()); // 输出: 20
