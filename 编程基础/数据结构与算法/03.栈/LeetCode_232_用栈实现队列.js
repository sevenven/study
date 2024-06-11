// https://leetcode-cn.com/problems/implement-queue-using-stacks/
// 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

// 实现 MyQueue 类：

// void push(int x) 将元素 x 推到队列的末尾
// int pop() 从队列的开头移除并返回元素
// int peek() 返回队列开头的元素
// boolean empty() 如果队列为空，返回 true ；否则，返回 false
// 说明：

// 你 只能 使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
// 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
	this.stackIn = [];
	this.stackOut = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} element
 * @return {void}
 */
MyQueue.prototype.push = function (element) {
	this.stackIn.push(element);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
	if (this.stackOut.length) return this.stackOut.pop();
	while (this.stackIn.length) this.stackOut.push(this.stackIn.pop());
	return this.stackOut.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
	const element = this.pop();
	this.stackOut.push(element);
	return element;
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
	return !this.stackIn.length && !this.stackOut.length;
};

var queue = new MyQueue();
console.log(queue.push(1)); // undefined
console.log(queue.push(2)); // undefined
console.log(queue.push(3)); // undefined
console.log(queue.peek()); // 1
console.log(queue.pop()); // 1
console.log(queue.push(4)); // undefined
console.log(queue.push(5)); // undefined
console.log(queue.empty()); // false
console.log(queue.pop()); // 2
console.log(queue.pop()); // 3
console.log(queue.pop()); // 4
console.log(queue.pop()); //
console.log(queue.empty()); // false
5;
