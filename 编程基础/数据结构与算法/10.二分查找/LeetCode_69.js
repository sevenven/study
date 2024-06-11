// https://leetcode-cn.com/problems/sqrtx/

/**
 * @param {number} x
 * @return {number}
 */
// 二分法
// 时间复杂度O(logn) 空间复杂度O(1)
var mySqrt = function (x) {
	var left = 0,
		right = x;
	while (left < right) {
		var mid = (left + right + 1) >> 1;
		if (mid * mid <= x) left = mid;
		else right = mid - 1;
	}
	return left;
};

/**
 * @param {number} x
 * @return {number}
 */
// 牛顿迭代法
var mySqrt = function (x) {
	var r = x;
	while (r * r > x) r = ((r + x / r) >> 1) | 0;
	return r;
};

console.log(mySqrt(0)); // 0
console.log(mySqrt(1)); // 1
console.log(mySqrt(8)); // 2
console.log(mySqrt(9)); // 3
