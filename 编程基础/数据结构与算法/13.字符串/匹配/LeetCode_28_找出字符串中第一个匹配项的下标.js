// https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/description/
// 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。
// 如果 needle 不是 haystack 的一部分，则返回  -1 。

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
	if (needle.length === 0) return 0;
	let next = getNext(needle);
	let j = 0;
	for (let i = 0; i < haystack.length; ++i) {
		while (haystack[i] !== needle[j] && j > 0) j = next[j - 1];
		if (haystack[i] === needle[j]) j++;
		if (j === needle.length) return i - needle.length + 1;
	}

	return -1;
};

function getNext(needle) {
	let next = [0],
		L = 0;
	for (let R = 1; R < needle.length; R++) {
		while (needle[L] !== needle[R] && L > 0) L = next[L - 1];
		if (needle[L] === needle[R]) L++;
		next.push(L);
	}
	return next;
}

// console.log(strStr('sadbutsad', 'sad'));
// console.log(strStr('leetcode', 'leeto'));
console.log(strStr('aabaabaaf', 'aabaaf'));
