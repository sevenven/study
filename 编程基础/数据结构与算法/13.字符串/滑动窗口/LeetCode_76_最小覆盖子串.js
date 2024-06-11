// https://leetcode-cn.com/problems/minimum-window-substring/
// 给你一个字符串 s 、一个字符串 t 。
// 返回 s 中涵盖 t 所有字符的最小子串。
// 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// 暴力
var minWindow = function (s, t) {
	let result = s + '-';
	for (let i = 0; i < s.length - t.length; i++) {
		for (let j = t.length - i; j <= s.length; j++) {
			let subString = s.substring(i, j);
			if (include(subString, t)) {
				result = result.length < subString.length ? result : subString;
			}
		}
	}
	return result === s + '-' ? '' : result;
};

function include(s, t) {
	let map = new Map();
	for (let c of t) map.set(c, (map.get(c) || 0) + 1);
	for (let c of s) map.get(c) && map.set(c, map.get(c) - 1);
	return !Array.from(map.values()).filter(val => val !== 0).length;
}

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// 滑动窗口
// 时间复杂度O(m + n) 空间复杂度O(n)
var minWindow = function (s, t) {
	let L = (R = start = 0),
		lC,
		rC,
		mapT = {},
		mapW = {},
		count = 0,
		len = Infinity;
	for (let c of t) mapT[c] = mapT[c] ? mapT[c]++ : 1;
	while (R < s.length) {
		// 增大窗口
		rC = s[R++];
		if (mapT[rC]) {
			mapW[rC] = mapW[rC] ? mapW[rC]++ : 1;
			if (mapT[rC] === mapW[rC]) count++;
		}
		// 缩小窗口
		while (count === Object.keys(mapT).length) {
			// 更新答案
			if (R - L < len) (start = L), (len = R - L);
			lC = s[L];
			if (mapT[lC]) {
				mapW[lC]--;
				if (mapW[lC] < mapT[lC]) count--;
			}
			L++;
		}
	}
	return len === Infinity ? '' : s.substring(start, start + len);
};

console.log(minWindow('ADOBECODEBANC', 'ABC')); // BANC
console.log(minWindow('A', 'AA')); // ""

console.log(minWindow('ADOBECODEBANC', 'ABC')); // BANC
console.log(minWindow('A', 'AA')); // ""
