// https://leetcode-cn.com/problems/longest-common-prefix/
// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。

/**
 * @param {string[]} strs
 * @return {string}
 */
// 时间复杂度O(n*m) 空间复杂度O(1)
var longestCommonPrefix = function (strs) {
	for (let i = 0; i < strs[0].length; i++) {
		for (let j = 1; j < strs.length; j++) {
			if (strs[0][i] !== strs[j][i]) return strs[0].slice(0, i);
		}
	}
	return strs[0];
};

console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car'])); // ""
console.log(longestCommonPrefix(['ab', 'abbb'])); // "ab"
console.log(longestCommonPrefix(['abbb', 'ab'])); // "ab"
