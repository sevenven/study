// https://leetcode-cn.com/problems/unique-paths-ii/

// dp方程：dp[i, j] = dp[i, j-1] + dp[i-1, j]

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
// 动态规划：时间复杂度O(n*m) 空间复杂度[O(m*n)|O(n)]
/* 
	动规五部曲
		1.确定dp表及其下标的含义 从[0, 0]到[i, j]有多少种不同的路径
		2.确定递推公式 dp[i, j] = obstacleGrid[i, j] === 0 && dp[i, j - 1] + dp[i - 1, j]
		3.dp表初始化 
		4.确定遍历顺序  从上往下 从左往右
		5.填充dp表
*/
var uniquePathsWithObstacles = function (obstacleGrid) {
  // 直接状态压缩写法
  if (!obstacleGrid || !obstacleGrid.length || obstacleGrid[0][0] === 1)
    return 0;
  const m = obstacleGrid.length,
    n = obstacleGrid[0].length,
    dp = [1];
  for (let j = 1; j < n; j++) dp[j] = obstacleGrid[0][j] === 1 ? 0 : dp[j - 1];
  for (let i = 1; i < m; i++) {
    obstacleGrid[i][0] === 1 && (dp[0] = 0);
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) dp[j] = 0;
      else dp[j] = dp[j] + dp[j - 1];
    }
  }
  return dp[n - 1];
};

console.log(
  uniquePathsWithObstacles([
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ])
); // 3
