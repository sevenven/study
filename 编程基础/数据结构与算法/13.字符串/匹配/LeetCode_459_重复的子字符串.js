// https://leetcode.cn/problems/repeated-substring-pattern/description/

// 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。

/**
 * @param {string} s
 * @return {boolean}
 */
// 暴力
var repeatedSubstringPattern = function (s) {
	for (let i = 0; i < s.length >> 1; i++) {
		for (let j = 0; j < s.length; j += i + 1) {
			if (s.substring(0, i + 1) !== s.substring(j, j + i + 1)) break;
			else if (j + i === s.length - 1) return true;
		}
	}
	return false;
};

/**
 * @param {string} s
 * @return {boolean}
 */
// 拼接字符串
var repeatedSubstringPattern = function (s) {
	const _s = s + s;
	return _s.substring(1, _s.length - 1).includes(s);
};

/**
 * @param {string} s
 * @return {boolean}
 */
// KMP
// 时间复杂度O(n) 空间复杂度O(n)
var repeatedSubstringPattern = function (s) {
	if (s.length === 0) return false;
	let next = getNext(s),
		len = s.length;
	if (next[len - 1] !== 0 && len % (len - next[len - 1]) === 0) return true;
	return false;
};

function getNext(pattern) {
	let next = [0],
		L = 0;
	for (let R = 1; R < pattern.length; R++) {
		while (pattern[L] !== pattern[R] && L > 0) L = next[L - 1];
		if (pattern[L] === pattern[R]) L++;
		next.push(L);
	}
	return next;
}

console.log(repeatedSubstringPattern('abab')); // true
console.log(repeatedSubstringPattern('aba')); // false
console.log(repeatedSubstringPattern('abcabcabcabc')); // true
console.log(repeatedSubstringPattern('ababab')); // true
