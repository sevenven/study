// https://leetcode-cn.com/problems/unique-paths/
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
// 问总共有多少条不同的路径？

// 提示：
// 1 <= m, n <= 100
// 题目数据保证答案小于等于 2 * 10^9

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 动态规划：时间复杂度O(m*n) 空间复杂度[O(m*n)|O(n)]
/* 
	动规五部曲 
		1.确定dp表及其下标的含义：从[0, 0]到[i, j]有多少种不同的路径 
		2.确定dp方程：dp[i, j] = dp[i - 1, j] + dp[i, j - 1]
		3.dp表初始化 
		4.确定遍历顺序：从上往下 从左往右 
		5.填充dp表 
*/
var uniquePaths = function (m, n) {
	// const dp = Array.from({ length: m }, () => []);
	// for (let i = 0; i < m; i++) dp[i][0] = 1;
	// for (let j = 1; j < n; j++) dp[0][j] = 1;
	// for (let i = 1; i < m; i++) {
	// 	for (j = 1; j < n; j++) {
	// 		dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
	// 	}
	// }
	// return dp[m - 1][n - 1];

	const dp = Array(n).fill(1);
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			dp[j] = dp[j] + dp[j - 1]; // 状态压缩 1.dp[j]保存上一行的dp[i - 1][j] 2.dp[j - 1]是当前行已更新的dp[i][j - 1]
		}
	}
	return dp[n - 1];
};

// 边界情况：只有一行
console.log(uniquePaths(1, 5)); // 输出: 1，因为只有一种方式可以走
// 边界情况：只有一列
console.log(uniquePaths(5, 1)); // 输出: 1，因为只有一种方式可以走
// 边界情况：只有一个格子
console.log(uniquePaths(1, 1)); // 输出: 1，起点和终点重合，只有一种方式
// 常规情况：小的网格
console.log(uniquePaths(3, 2)); // 输出: 3
// 常规情况：中等大小的网格
console.log(uniquePaths(3, 7)); // 输出: 28
// 常规情况：更大的网格
console.log(uniquePaths(5, 5)); // 输出: 70
