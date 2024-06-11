// https://leetcode.cn/problems/happy-number/description/

// 编写一个算法来判断一个数 n 是不是快乐数。
/*
 *「快乐数」 定义为：
 * 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
 * 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
 * 如果这个过程 结果为 1，那么这个数就是快乐数。
 * 如果 n 是 快乐数 就返回 true ；不是，则返回 false 。
 */

/**
 * @param {number} n
 * @return {boolean}
 */
// Set
// 时间复杂度O(logn) 空间复杂度O(logn)
var isHappy = function (n) {
	let set = new Set(),
		sum = n;
	while (true) {
		sum = getSum(sum);
		if (sum === 1) return true;
		if (set.has(sum)) return false;
		set.add(sum);
	}
};

function getSum(num) {
	let sum = 0,
		n;
	for (let digit = 1; num / digit >= 1; digit *= 10) {
		n = Math.floor(num / digit) % 10;
		sum += n * n;
	}
	return sum;
}

console.log(isHappy(19)); // true
console.log(isHappy(2)); // false
