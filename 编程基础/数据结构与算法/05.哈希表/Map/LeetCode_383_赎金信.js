// https://leetcode.cn/problems/ransom-note/description/
// 给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。
// 如果可以，返回 true ；否则返回 false 。
// magazine 中的每个字符只能在 ransomNote 中使用一次。

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
// Map
// 时间复杂度O(n) 空间复杂度O(n)
var canConstruct = function (ransomNote, magazine) {
	let map = new Map();
	for (let m of magazine) map.set(m, (map.get(m) || 0) + 1);
	for (let r of ransomNote) {
		if (map.get(r) > 0) map.set(r, map.get(r) - 1);
		else return false;
	}
	return true;
};

console.log(canConstruct('aa', 'ab'));
console.log(canConstruct('aa', 'aab'));
