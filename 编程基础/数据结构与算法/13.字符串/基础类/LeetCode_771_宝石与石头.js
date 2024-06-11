// https://leetcode-cn.com/problems/jewels-and-stones/

// 给你一个字符串 jewels 代表石头中宝石的类型，另有一个字符串 stones 代表你拥有的石头。 stones 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
// 字母区分大小写，因此 "a" 和 "A" 是不同类型的石头。

/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
// 暴力
// 时间复杂度O(n*m) 空间复杂度O(1)
var numJewelsInStones = function (jewels, stones) {
	let count = 0;
	for (let s of stones) {
		for (let j of jewels) {
			if (s === j) count++;
		}
	}
	return count;
};

/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
// 使用Set
// 时间复杂度O(n + m) 空间复杂度O(m)
var numJewelsInStones = function (jewels, stones) {
	let count = 0,
		set = new Set();
	for (j of jewels) set.add(j);
	for (s of stones) if (set.has(s)) count++;
	return count;
};
console.log(numJewelsInStones('aA', 'aAAbbbb')); // 3
