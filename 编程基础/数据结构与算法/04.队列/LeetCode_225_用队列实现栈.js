// https://leetcode-cn.com/problems/implement-stack-using-queues/
// 请你仅使用两个队列实现一个先入后出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。

// 实现 MyStack 类：
// void push(int x) 将元素 x 压入栈顶。
// int pop() 移除并返回栈顶元素。
// int top() 返回栈顶元素。
// boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。

// 注意：
// 你只能使用队列的基本操作 —— 也就是 push to back、peek/pop from front、size 和 is empty 这些操作。
// 你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。

/**
 * Initialize your data structure here.
 * 写法1
 */
var MyStack = function () {
	this.queue = [];
	this.queueTemp = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (element) {
	this.queue.push(element);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {
	if (!this.queue.length) [this.queue, this.queueTemp] = [this.queueTemp, this.queue];
	while (this.queue.length > 1) this.queueTemp.push(this.queue.shift());
	return this.queue.shift();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {
	const element = this.pop();
	this.queue.push(element);
	return element;
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
	return !this.queue.length && !this.queueTemp.length;
};

// --------------------------------------------------------------------------------------------------------
/**
 * Initialize your data structure here.
 * 写法2
 */
var MyStack = function () {
	this.queue = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (element) {
	this.queue.push(element);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {
	let time = this.queue.length - 1;
	while (time-- > 0) this.queue.push(this.queue.shift());
	return this.queue.shift();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {
	const element = this.pop();
	this.queue.push(element);
	return element;
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
	return !this.queue.length;
};

const stack = new MyStack();
console.log(stack.push(1)); // undefined
console.log(stack.push(2)); // undefined
console.log(stack.push(3)); // undefined
console.log(stack.top()); // 3
console.log(stack.pop()); // 3
console.log(stack.empty()); // false
console.log(stack.push(4)); // undefined
console.log(stack.push(5)); //undefined
console.log(stack.pop()); // 5
console.log(stack.pop()); // 4
console.log(stack.pop()); // 2
console.log(stack.pop()); // 1
console.log(stack.empty()); // true
