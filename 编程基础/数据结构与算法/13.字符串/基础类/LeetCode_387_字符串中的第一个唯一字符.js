// https://leetcode-cn.com/problems/first-unique-character-in-a-string/

/**
 * @param {string} s
 * @return {number}
 */
// 暴力
// 时间复杂度O(n^2) 空间复杂度O(1)
var firstUniqChar = function (s) {
	if (s.length < 2) return -1;
	let flag;
	for (let i = 0; i < s.length; i++) {
		flag = false;
		for (let j = 0; j < s.length; j++) {
			if (i !== j && s[i] === s[j]) flag = true;
		}
		if (!flag) return i;
	}
	return -1;
};

/**
 * @param {string} s
 * @return {number}
 */
// Map
// 时间复杂度O(n) 空间复杂度O(n)
var firstUniqChar = function (s) {
	const map = new Map();
	for (c of s) map.set(c, (map.get(c) || 0) + 1);
	for (let i = 0; i < s.length; i++) {
		if (map.get(s[i]) === 1) return i;
	}
	return -1;
};

/**
 * @param {string} s
 * @return {number}
 */
// 数组索引作为hash key
// 时间复杂度O(n) 空间复杂度O(n)
var firstUniqChar = function (s) {
	const arr = Array(26).fill(0);
	for (c of s) arr[c.charCodeAt() - 97]++;
	for (let i = 0; i < s.length; i++) {
		if (arr[s[i].charCodeAt() - 97] === 1) return i;
	}
	return -1;
};

console.log(firstUniqChar('z')); // 0
console.log(firstUniqChar('cc')); // -1
console.log(firstUniqChar('cca')); // 2
console.log(firstUniqChar('leetcode')); // 0
console.log(firstUniqChar('loveleetcode')); // 2
