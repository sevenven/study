// https://leetcode-cn.com/problems/valid-palindrome/
// 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
// 字母和数字都属于字母数字字符。
// 给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。

/**
 * @param {string} s
 * @return {boolean}
 */
// 双指针1
// 时间复杂度O(n) 空间复杂度O(1)
var isPalindrome = function (s) {
	var L = 0,
		R = s.length - 1;
	while (L < R) {
		if (!isLetterOrNumber(s[L])) L++;
		else if (!isLetterOrNumber(s[R])) R--;
		else if (s[L++].toLowerCase() !== s[R--].toLowerCase()) return false;
	}
	return true;
};

function isLetterOrNumber(s) {
	const code = s.charCodeAt();
	return (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
}

/**
 * @param {string} s
 * @return {boolean}
 */
// 双指针2
// 时间复杂度O(n) 空间复杂度O(n)
var isPalindrome = function (s) {
	let str = s.replace(/\W/g, '').toLowerCase(),
		L = 0,
		R = str.length - 1;
	while (L < R) if (str[L++] !== str[R--]) return false;
	return true;
};

console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car')); // false
console.log(isPalindrome('')); // true
