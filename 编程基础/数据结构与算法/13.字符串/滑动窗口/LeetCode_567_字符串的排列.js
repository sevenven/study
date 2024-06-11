// https://leetcode.cn/problems/permutation-in-string/description/

// 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。
// 换句话说，s1 的排列之一是 s2 的 子串 。

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
	let L = (R = 0);
	while (R < s2.length) {
		// 增大窗口
		R++;
		// 缩小窗口-保证窗口大小为s1.length
		if (R - L === s1.length) {
			if (s2.substring(L, R) === s1) return true;
			L++;
		}
	}
	return false;
};

console.log(checkInclusion('ab', 'eidbaooo')); // true
console.log(checkInclusion('ab', 'eidboaoo')); // false
