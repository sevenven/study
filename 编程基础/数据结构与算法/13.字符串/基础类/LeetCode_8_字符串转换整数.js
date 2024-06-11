// https://leetcode-cn.com/problems/string-to-integer-atoi/

// 请你来实现一个 myAtoi(string s) 函数，使其能将字符串转换成一个 32 位有符号整数。
// 函数 myAtoi(string s) 的算法如下：
// 空格：读入字符串并丢弃无用的前导空格（" "）
// 符号：检查下一个字符（假设还未到字符末尾）为 '-' 还是 '+'。如果两者都不存在，则假定结果为正。
// 转换：通过跳过前置零来读取该整数，直到遇到非数字字符或到达字符串的结尾。如果没有读取数字，则结果为0。
// 舍入：如果整数数超过 32 位有符号整数范围 [−231,  231 − 1] ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 −231 的整数应该被舍入为 −231 ，大于 231 − 1 的整数应该被舍入为 231 − 1 。
// 返回整数作为最终结果。

/**
 * @param {string} str
 * @return {number}
 */
// 使用库函数
var myAtoi = function (str) {
	return Math.max(Math.min(parseInt(str) || 0, 2147483647), -2147483648);
};

/**
 * @param {string} str
 * @return {number}
 */
// 手动转换
// 时间复杂度O(n) 空间复杂度O(1)
var myAtoi = function (str) {
	let sign = 1,
		num = 0,
		i = 0;
	while (str[i] === ' ') i++;
	if (str[i] === '-' || str[i] === '+') sign = str[i++] === '-' ? -1 : 1;
	while (str[i] && str[i].charCodeAt() >= 48 && str[i].charCodeAt() <= 57) num = num * 10 + str[i++] * 1;
	num = sign * num;
	return Math.max(Math.min(num, 2147483647), -2147483648);
};

console.log(myAtoi('+1')); // 1
console.log(myAtoi('   -42')); // -42
console.log(myAtoi('4193 with words')); // 4193
console.log(myAtoi('words and 987')); // 0
console.log(myAtoi('91283472332')); // 2147483647
console.log(myAtoi('-91283472332')); // -2147483648
