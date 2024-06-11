// https://leetcode-cn.com/problems/number-of-1-bits/

/**
 * @param {number} n
 * @return {number}
 */
// &1判断再右移
// JS实际上是32位有符号整数 -> 题目指明输入无符号整数--> 使用无符号右移 负数右移高位也补0
var hammingWeight = function (n) {
	var count = 0;
	while (n) {
		if (n & (1 === 1)) count++;
		n = n >> 1;
	}
	return count;
};

/**
 * @param {number} n
 * @return {number}
 */
// 打掉最低位的1
var hammingWeight = function (n) {
	var count = 0;
	while (n) {
		count++;
		n = n & (n - 1);
	}
	return count;
};

console.log(hammingWeight(00000000000000000000000000001011)); // 3
console.log(hammingWeight(00000000000000000000000010000000)); // 1
console.log(hammingWeight(00000000000000000000000011111111)); // 8
