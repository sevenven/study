// https://leetcode-cn.com/problems/unique-paths/

// dp方程：dp[i, j] = dp[i, j-1] + dp[i-1, j]

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 动态规划：时间复杂度O(m*n) 空间复杂度[O(m*n)|O(n)]
/* 
	动规五部曲
		1.确定dp表及其下标的含义 从[0, 0]到[i, j]有多少种不同的路径
		2.确定递推公式 dp[i, j] = dp[i - 1, j] + dp[i, j - 1]
		3.dp表初始化 第一行&第一列初始化为1
		4.确定遍历顺序 从上往下 从左往右 
		5.填充dp表
*/
var uniquePaths = function (m, n) {
  // const dp = Array.from({ length: m }, () => []);
  // for (let i = 0; i < m; i++) dp[i][0] = 1;
  // for (let j = 1; j < n; j++) dp[0][j] = 1;
  // for (let i = 1; i < m; i++) {
  //   for (j = 1; j < n; j++) {
  //     dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
  //   }
  // }
  // return dp[m - 1][n - 1];
  // 状态压缩
  const dp = Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] = dp[j] + dp[j - 1];
    }
  }
  return dp[n - 1];
};

console.log(uniquePaths(3, 2)); // 3
console.log(uniquePaths(7, 3)); // 28
