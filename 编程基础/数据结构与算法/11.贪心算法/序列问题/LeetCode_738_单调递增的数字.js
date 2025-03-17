// https://leetcode.cn/problems/monotone-increasing-digits/
// 当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。
// 给定一个整数 n ，返回 小于或等于 n 的最大数字，且数字呈 单调递增 。

/**
 * @param {number} n
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(n)
var monotoneIncreasingDigits = function (n) {
	const strNum = n.toString().split('');
	let flag = strNum.length; // 标记需要变为9的位置

	// 从右向左遍历
	for (let i = strNum.length - 1; i > 0; i--) {
		// 如果左边数字大于右边数字
		if (strNum[i - 1] > strNum[i]) {
			flag = i; // 记录位置
			strNum[i - 1]--; // 左边数字减1
		}
	}

	// 将flag位置及其右边的数字都变为9
	for (let i = flag; i < strNum.length; i++) {
		strNum[i] = '9';
	}

	return parseInt(strNum.join(''));
};

console.log(monotoneIncreasingDigits(332)); // 299
console.log(monotoneIncreasingDigits(100)); // 99
console.log(monotoneIncreasingDigits(1234)); // 1234
console.log(monotoneIncreasingDigits(120)); // 119
console.log(monotoneIncreasingDigits(543)); // 499
