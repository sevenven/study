// https://leetcode-cn.com/problems/valid-parentheses/
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 str ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。

/**
 * @param {string} str
 * @return {boolean}
 */
// 暴力求解：不断replace匹配的括号 --> ""
// 使用了正则表达式 会很慢
var isValid = function (str) {
	while (str) {
		const original = str;
		str = str.replace(/\(\)/, '').replace(/\[\]/, '').replace(/\{\}/, '');
		if (str === original) return false;
	}
	return true;
};

/**
 * @param {string} str
 * @return {boolean}
 */
// 左括号入栈
// 时间复杂度O(n) 空间复杂度O(n)
var isValid = function (str) {
	const map = { '(': ')', '[': ']', '{': '}' },
		stack = [];
	for (s of str) {
		if (map[s]) stack.push(s);
		else if (!stack.length || s !== map[stack.pop()]) return false; // 右括号多了或者两者左右括号无法匹配
	}
	return !stack.length; // 看是否有多余的左括号
};

/**
 * @param {string} str
 * @return {boolean}
 */
// 右括号入栈
// 时间复杂度O(n) 空间复杂度O(n)
var isValid = function (str) {
	const map = { '(': ')', '[': ']', '{': '}' },
		stack = [];
	for (c of str) {
		if (map[c]) stack.push(map[c]);
		else if (!stack.length || stack.pop() !== c) return false; // 右括号多了或者两者左右括号无法匹配
	}
	return !stack.length; // 看是否有多余的左括号
};

console.log(isValid('()[]{}')); // true
console.log(isValid('([)]')); // false
console.log(isValid('')); // true
