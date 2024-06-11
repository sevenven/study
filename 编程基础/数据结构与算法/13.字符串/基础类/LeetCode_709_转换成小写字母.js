// https://leetcode-cn.com/problems/to-lower-case/
// 给你一个字符串 s ，将该字符串中的大写字母转换成相同的小写字母，返回新的字符串。

/**
 * @param {string} str
 * @return {string}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var toLowerCase = function (s) {
	let _s = '',
		code;
	for (let c of s) {
		code = c.charCodeAt();
		if (code >= 65 && code <= 90) _s += String.fromCharCode(code + 32);
		else _s += c;
	}
	return _s;
};

console.log(toLowerCase('Hello')); // hello
console.log(toLowerCase('LOVELY')); // lovely
