// https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/

// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
// 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// 滑动窗口1-测试用例通过了，但耗时太长。
var findAnagrams = function (s, p) {
	let L = 0,
		R = p.length,
		result = [];
	while (R <= s.length) {
		if (isAnagrams(s.slice(L, R), p)) result.push(L);
		L++;
		R++;
	}
	return result;
};

function isAnagrams(s, t) {
	let arr = Array(26).fill(0);
	for (c of s) arr[c.charCodeAt() - 97]++;
	for (c of t) arr[c.charCodeAt() - 97]--;
	for (let a of arr) if (a !== 0) return false;
	return true;
}

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// 代码改进
// 时间复杂度O(n) 空间复杂度O(1)
var findAnagrams = function (s, p) {
	let L = (R = 0),
		arrW = Array(26).fill(0),
		arrP = Array(26).fill(0),
		result = [];
	for (let c of p) arrP[c.charCodeAt() - 97]++;
	while (R < s.length) {
		// 增加窗口
		arrW[s[R++].charCodeAt() - 97]++;
		// 缩小窗口-保证窗口大小为p.length
		while (R - L === p.length) {
			// 更新答案--此处不严谨-可能会发生哈希碰撞
			if (arrW.join() === arrP.join()) result.push(L);
			arrW[s[L++].charCodeAt() - 97]--;
		}
	}
	return result;
};

console.log(findAnagrams('cba', 'abc')); // [ 0, 6 ]
console.log(findAnagrams('cbaebabacd', 'abc')); // [ 0, 6 ]
console.log(findAnagrams('abab', 'ab')); // [ 0, 1, 2 ]

console.log(findAnagrams('cbaebabacd', 'abc')); // [ 0, 6 ]
console.log(findAnagrams('abab', 'ab')); // [ 0, 1, 2 ]
