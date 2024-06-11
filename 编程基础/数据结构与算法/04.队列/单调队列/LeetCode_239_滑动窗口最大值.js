// https://leetcode.cn/problems/permutation-in-string/description/

// 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。
// 换句话说，s1 的排列之一是 s2 的 子串 。

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
	let L = (R = 0),
		arrS1 = Array(26).fill(0);
	arrW = Array(26).fill(0);
	for (let c of s1) arrS1[c.charCodeAt() - 97]++;
	while (R < s2.length) {
		// 增加窗口
		arrW[s2[R++].charCodeAt() - 97]++;
		// 缩小窗口-保证窗口大小为s1.length
		if (R - L === s1.length) {
			// 更新答案--此处不严谨-可能会发生哈希碰撞
			if (arrW.join() === arrS1.join()) return true;
			arrW[s2[L++].charCodeAt() - 97]--;
		}
	}
	return false;
};

console.log(checkInclusion('ab', 'eidbaooo')); // true
console.log(checkInclusion('ab', 'eidboaoo')); // false
