// https://leetcode-cn.com/problems/generate-parentheses/

// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

/**
 * @param {number} n
 * @return {string[]}
 */
// 回溯
var generateParenthesis = function (n, str = '', left = 0, right = 0, result = []) {
	if (left === n && right === n) result.push(str);
	if (left < n) generateParenthesis(n, str + '(', left + 1, right, result);
	if (right < left) generateParenthesis(n, str + ')', left, right + 1, result);
	return result;
};

console.log(generateParenthesis(3));
