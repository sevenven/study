// https://leetcode-cn.com/problems/lru-cache/

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
	this.capacity = capacity;
	this.map = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
	const value = this.map.get(key);
	if (value === undefined) return -1;
	this.map.delete(key);
	this.map.set(key, value);
	return value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
	this.map.delete(key);
	this.map.set(key, value);
	if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value);
};

var cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); //  1
cache.put(3, 3); // 该操作会使得密钥2作废
console.log(cache.get(2)); //  -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥1作废
console.log(cache.get(1)); // -1 (未找到)
console.log(cache.get(3)); //  3
console.log(cache.get(4)); //  4
