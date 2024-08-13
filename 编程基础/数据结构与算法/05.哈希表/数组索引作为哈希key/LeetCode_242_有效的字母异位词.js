// https://leetcode-cn.com/problems/valid-anagram/
// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
// 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 暴力求解
// 时间复杂度O(nlogn) 空间复杂度O(n)
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false;
	return s.split('').sort().join('') === t.split('').sort().join('');
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 数组索引作为哈希key-针对只有小写字母的字符串
// 时间复杂度O(n) 空间复杂度O(1)
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false;
	const hash = Array(26).fill(0);
	for (let i = 0; i < s.length; i++) {
		hash[s[i].charCodeAt() - 97]++;
		hash[t[i].charCodeAt() - 97]--;
	}
	for (let c of hash) if (c !== 0) return false;
	return true;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// Map-通用
// 时间复杂度O(n) 空间复杂度O(n)
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false;
	const map = {};
	for (let i = 0; i < s.length; i++) {
		map[s[i]] = map[s[i]] === undefined ? 1 : ++map[s[i]];
		map[t[i]] = map[t[i]] === undefined ? -1 : --map[t[i]];
	}
	for (let k in map) if (map[k] !== 0) return false;
	return true;
};

console.log(isAnagram('anagram', 'nagaram')); // true
console.log(isAnagram('rat', 'car')); // false
console.log(isAnagram('', '')); // true
