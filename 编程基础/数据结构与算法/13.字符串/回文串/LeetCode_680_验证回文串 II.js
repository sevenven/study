// https://leetcode-cn.com/problems/valid-palindrome-ii/
// 给你一个字符串s 最多可以从中删除一个字符。
// 请你判断 s 是否能成为回文字符串：如果能，返回 true ；否则，返回 false 。

/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (str, skipped = false) {
	let L = 0,
		R = str.length - 1;
	while (L < R) {
		if (str[L++] !== str[R--]) {
			if (skipped) return false;
			return validPalindrome(str.substring(L, R + 2), true) || validPalindrome(str.substring(L - 1, R + 1), true);
		}
	}
	return true;
};

console.log(validPalindrome('aba')); // true
console.log(validPalindrome('abca')); // true
