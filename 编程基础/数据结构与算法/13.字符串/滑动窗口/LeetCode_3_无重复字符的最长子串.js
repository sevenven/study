// https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/

// 给定一个字符串s 请你找出其中不含有重复字符 的最长子串的长度。

/**
 * @param {string} s
 * @return {number}
 */
// 滑动窗口
var lengthOfLongestSubstring = function (s) {
	let L = (R = 0),
		map = new Map(),
		len = 0;
	while (R < s.length) {
		// 增大窗口
		const cR = s[R];
		map.set(cR, (map.get(cR) || 0) + 1);
		R++;
		// 缩小窗口-保证窗口内的字母不重复
		while (map.get(cR) > 1) {
			map.set(s[L], map.get(s[L]) - 1);
			L++;
		}
		// 更新答案
		len = Math.max(len, R - L);
	}
	return len;
};

console.log(lengthOfLongestSubstring('abcabcbb')); // 3
console.log(lengthOfLongestSubstring('bbbbb')); // 1
console.log(lengthOfLongestSubstring('pwwkew')); // 3
