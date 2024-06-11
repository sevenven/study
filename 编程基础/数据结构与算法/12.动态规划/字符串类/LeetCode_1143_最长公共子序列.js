// https://leetcode-cn.com/problems/longest-common-subsequence/

// dp方程：
// if (s[i] === s[j]) dp[i, j] = dp[i-1, j-1] + 1
// if (s[i] !== s[j]) dp[i, j] = max {dp[i, j-1], dp[i-1, j]}

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// 第一种写法
// 时间复杂度O(n*m) 空间复杂度O(n*m)
var longestCommonSubsequence = function (text1, text2) {
	if (!text1.length || !text2.length) return 0;
	var n = text1.length,
		m = text2.length,
		dp = [];
	for (var i = 0; i < n; i++) {
		dp[i] = [];
		dp[i][0] = text1[i] === text2[0] ? 1 : i === 0 ? 0 : dp[i - 1][0];
	}
	for (var j = 0; j < m; j++) dp[0][j] = text2[i] === text1[0] ? 1 : i === 0 ? 0 : dp[0][j - 1];
	for (var i = 1; i < n; i++) {
		for (var j = 1; j < m; j++) {
			if (text1[i] === text2[j]) dp[i][j] = dp[i - 1][j - 1] + 1;
			else dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
		}
	}
	return dp[n - 1][m - 1];
};

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// 第二种写法
// 时间复杂度O(n*m) 空间复杂度O(2m)
var longestCommonSubsequence = function (text1, text2) {
	if (!text1.length || !text2.length) return 0;
	var n = text1.length,
		m = text2.length,
		cur = [],
		prev = [];
	for (var j = 0; j < m; j++) prev[j] = cur[j] = text2[j] === text1[0] ? 1 : j === 0 ? 0 : cur[j - 1];
	for (var i = 1; i < n; i++) {
		if (text1[i] === text2[0]) cur[0] = 1;
		for (var j = 1; j < m; j++) {
			if (text1[i] === text2[j]) cur[j] = prev[j - 1] + 1;
			else cur[j] = Math.max(cur[j - 1], prev[j]);
		}
		prev = cur.slice(0);
	}
	return cur[m - 1];
};

console.log(longestCommonSubsequence('abcde', 'ace')); // 3
