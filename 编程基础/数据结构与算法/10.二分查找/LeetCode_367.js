// https://leetcode-cn.com/problems/valid-perfect-square/

/**
 * @param {number} num
 * @return {boolean}
 */
// 二分查找法
// 时间复杂度O(logn) 空间复杂度O(1)
var isPerfectSquare = function (num) {
	var left = 0,
		right = num;
	while (left < right) {
		var mid = (left + right + 1) >> 1;
		if (mid * mid <= num) left = mid;
		else right = mid - 1;
	}
	return left * left === num;
};

/**
 * @param {number} num
 * @return {boolean}
 */
// 等差数列法 1 + 3 + 5 + 7 + ... + (2n−1) = n^2
// 时间复杂度O(logn) 空间复杂度O(1)
var isPerfectSquare = function (num) {
	var i = 1;
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
	var r = num;
	while (r * r > num) r = ((r + num / r) >> 1) | 0;
	return r * r === num;
};

console.log(isPerfectSquare(16));
console.log(isPerfectSquare(14));
