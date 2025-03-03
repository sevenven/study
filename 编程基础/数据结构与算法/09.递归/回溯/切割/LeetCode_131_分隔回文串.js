// https://leetcode.cn/problems/palindrome-partitioning/description/

// 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串。
// 返回 s 所有可能的分割方案。

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s, startIndex = 0, path = [], result = []) {
	if (startIndex === s.length) {
		result.push(Array.from(path));
		return result;
	}
	for (let i = startIndex; i < s.length; i++) {
		if (!isPalindrome(s, startIndex, i)) continue;
		path.push(s.slice(startIndex, i + 1)); // slice: 左闭右开

		partition(s, i + 1, path, result); // startIndex: 隐藏回溯
		path.pop(); // 标准回溯
	}
	return result;
};

function isPalindrome(s, L, R) {
	while (L < R) if (s[L++] !== s[R--]) return false;
	return true;
}

console.log(partition('aab'));
console.log(partition('a'));
