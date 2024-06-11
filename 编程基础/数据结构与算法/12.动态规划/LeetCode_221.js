// https://leetcode-cn.com/problems/maximal-square/
// 第一遍完成
// 第二遍完成
// 第三遍完成

// dp方程 max:dp[i] = Math.min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1]) + 1;

/**
 * @param {character[][]} matrix
 * @return {number}
 */
// 时间复杂度O(n*m) 空间复杂度O(n*m)
var maximalSquare = function (matrix) {
	var n = matrix.length,
		m = matrix[0].length,
		dp = [],
		max = 0;
	for (var i = 0; i < n; i++) {
		dp[i] = [];
		for (var j = 0; j < m; j++) {
			if (i === 0 || j === 0 || matrix[i][j] == 0) dp[i][j] = matrix[i][j];
			else dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1;
			max = Math.max(max, dp[i][j]);
		}
	}
	return max * max;
};

/**
 * @param {character[][]} matrix
 * @return {number}
 */
// 时间复杂度O(n*m) 空间复杂度O(m)
var maximalSquare = function (matrix) {
	if (!matrix || !matrix.length) return 0;
	var n = matrix.length,
		m = matrix[0].length,
		cur = [],
		prev = [],
		max = 0;
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < m; j++) {
			if (i === 0 || j === 0 || matrix[i][j] == 0) cur[j] = matrix[i][j];
			else cur[j] = Math.min(cur[j - 1], cur[j], prev[j - 1]) + 1;
			max = Math.max(max, cur[j]);
		}
		prev = cur.slice(0);
	}
	return max * max;
};

console.log(
	maximalSquare([
		['1', '0', '1', '0', '0'],
		['1', '0', '1', '1', '1'],
		['1', '1', '1', '1', '1'],
		['1', '0', '0', '1', '0']
	])
); // 4

console.log(maximalSquare([['1']])); // 1

console.log(maximalSquare([['0']])); // 0
