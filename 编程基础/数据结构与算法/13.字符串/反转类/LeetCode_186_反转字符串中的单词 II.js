// https://leetcode.cn/problems/reverse-words-in-a-string-ii/description/

// 给你一个字符数组 s ，反转其中 单词 的顺序。
// 单词 的定义为：单词是一个由非空格字符组成的序列。s 中的单词将会由单个空格分隔。
// 必须设计并实现 原地 解法来解决此问题，即不分配额外的空间。

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseWords = function (s) {
	let L = 0;
	reverse(s, 0, s.length - 1);
	for (let i = 0; i <= s.length; i++) {
		if (s[i] === ' ' || i === s.length) {
			reverse(s, L, i - 1);
			L = i + 1;
		}
	}
};

function reverse(arr, L, R) {
	while (L < R) [arr[L++], arr[R--]] = [arr[R], arr[L]];
}

reverseWords((s = ['t', 'h', 'e', ' ', 's', 'k', 'y', ' ', 'i', 's', ' ', 'b', 'l', 'u', 'e']));
console.log(s); // ['b', 'l', 'u', 'e', ' ', 'i', 's', ' ', 's', 'k', 'y', ' ', 't', 'h', 'e'];
reverseWords((s = ['a']));
console.log(s); // ['a'];
