// 实现RandomizedSet 类：

// RandomizedSet() 初始化 RandomizedSet 对象
// bool insert(int val) 当元素 val 不存在时，向集合中插入该项，并返回 true ；否则，返回 false 。
// bool remove(int val) 当元素 val 存在时，从集合中移除该项，并返回 true ；否则，返回 false 。
// int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。每个元素应该有 相同的概率 被返回。
// 你必须实现类的所有函数，并满足每个函数的 平均 时间复杂度为 O(1) 。

var RandomizedSet = function () {
	this.element = [];
	this.exits = new Map();
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
	if (this.exits.get(val) !== undefined) return false;
	this.element.push(val);
	this.exits.set(val, this.element.length - 1);
	return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
	const index = this.exits.get(val);
	if (index === undefined) return false;
	this.element[index] = this.element[this.element.length - 1];
	this.element.pop();
	this.element[index] && this.exits.set(this.element[index], index);
	this.exits.delete(val);
	return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
	return this.element[Math.floor(Math.random() * this.element.length)];
};

var obj = new RandomizedSet();
console.log(obj.insert(1), obj.element, obj.exits);
console.log(obj.insert(1), obj.element);
console.log(obj.insert(2), obj.element, obj.exits);
console.log(obj.insert(9), obj.element, obj.exits);
// console.log(obj.remove(0), obj.element);
// console.log(obj.remove(2), obj.element, obj.exits);
// console.log(obj.remove(9), obj.element, obj.exits);
console.log(obj.getRandom(), obj.getRandom(), obj.getRandom());
