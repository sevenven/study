// https://leetcode-cn.com/problems/sqrtx/

// 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
// 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

/**
 * @param {number} x
 * @return {number}
 */
// 二分法
// 时间复杂度O(logn) 空间复杂度O(1)
var mySqrt = function (x) {
	let L = 0,
		R = x,
		mid;
	while (L <= R) {
		mid = L + ((R - L) >> 1);
		if (mid * mid < x) L = mid + 1;
		else if (mid * mid > x) R = mid - 1;
		else return mid;
	}
	return L - 1;
};

/**
 * @param {number} x
 * @return {number}
 */
// 牛顿迭代法
var mySqrt = function (x) {
	let r = x;
	while (r * r > x) r = ((r + x / r) >> 1) | 0;
	return r;
};

console.log(mySqrt(0)); // 0
console.log(mySqrt(1)); // 1
console.log(mySqrt(8)); // 2
console.log(mySqrt(9)); // 3
