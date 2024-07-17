// https://leetcode-cn.com/problems/valid-perfect-square/

// 给你一个正整数 num 。如果 num 是一个完全平方数，则返回 true ，否则返回 false 。
// 完全平方数 是一个可以写成某个整数的平方的整数。换句话说，它可以写成某个整数和自身的乘积。
// 不能使用任何内置的库函数，如  sqrt 。

/**
 * @param {number} num
 * @return {boolean}
 */
// 二分查找法
// 时间复杂度O(logn) 空间复杂度O(1)
var isPerfectSquare = function (num) {
	let L = 0,
		R = num,
		mid;
	while (L <= R) {
		mid = L + ((R - L) >> 1);
		if (mid * mid < num) L = mid + 1;
		else if (mid * mid > num) R = mid - 1;
		else return true;
	}
	return false;
};

/**
 * @param {number} num
 * @return {boolean}
 */
// 等差数列法 1 + 3 + 5 + 7 + ... + (2n−1) = n^2
// 时间复杂度O(logn) 空间复杂度O(1)
var isPerfectSquare = function (num) {
	let i = 1;
	while (num > 0) {
		num -= i;
		i += 2;
	}
	return num === 0;
};

/**
 * @param {number} num
 * @return {boolean}
 */
// 牛顿迭代法
var isPerfectSquare = function (num) {
	let r = num;
	while (r * r > num) r = ((r + num / r) >> 1) | 0;
	return r * r === num;
};

console.log(isPerfectSquare(16));
console.log(isPerfectSquare(14));
