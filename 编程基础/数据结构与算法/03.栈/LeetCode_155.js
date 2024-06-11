// https://leetcode-cn.com/problems/min-stack/
// 设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。

// 实现 MinStack 类:

// MinStack() 初始化堆栈对象。
// void push(int val) 将元素val推入堆栈。
// void pop() 删除堆栈顶部的元素。
// int top() 获取堆栈顶部的元素。
// int getMin() 获取堆栈中的最小元素。

/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.element = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.element.push({
    val,
    min: this.element.length ? Math.min(val, this.getMin()) : val,
  });
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  return this.element.length ? this.element.pop().val : undefined;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.element.length
    ? this.element[this.element.length - 1].val
    : undefined;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.element.length
    ? this.element[this.element.length - 1].min
    : undefined;
};

var minStack = new MinStack();
minStack.push(3);
minStack.push(5);
minStack.push(1);
minStack.push(7);
minStack.push(4);
console.log(minStack.pop()); // 4
console.log(minStack.top()); // 7
console.log(minStack.getMin()); // 1
