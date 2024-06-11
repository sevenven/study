// https://leetcode-cn.com/problems/powx-n/
// 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xn ）。

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// 暴力法
// 时间复杂度O(n) 空间复杂度O(1)
var myPow = function (x, n) {
	if (n < 0) [x, n] = [1 / x, -n];
	let ans = 1;
	for (let i = 0; i < n; i++) ans *= x;
	return ans;
};

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// 分治法
// 时间复杂度O(logn) 空间复杂度O(logn)
var myPow = function (x, n, caches = []) {
	if (n < 0) [x, n] = [1 / x, -n];
	if (n === 0) return 1;
	if (n === 1) return x;
	if (caches[n]) return caches[n];
	let half = n >> 1;
	return (caches[n] = myPow(x, half, caches) * myPow(x, n - half, caches));
};

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// 牛顿迭代法
// 时间复杂度O(logn) 空间复杂度O(1)
var myPow = function (x, n) {
	if (n < 0) [x, n] = [1 / x, -n];
	let ans = 1;
	for (var i = n; i > 0; i = i >> 1) {
		if (i % 2 === 1) {
			ans *= x;
		}
		x *= x;
	}
	return ans;
};

console.log(myPow(2.0, 10)); // 1024
console.log(myPow(2.1, 3)); // 9.26
console.log(myPow(2.0, -2)); // 0.25
console.log(myPow(0.44528, 0)); // 1
console.log(myPow(2.0, -2147483648)); // 0
