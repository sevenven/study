// https://leetcode-cn.com/problems/minimum-path-sum/

// 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
// 说明：每次只能向下或者向右移动一步。

/**
 * @param {number[][]} grid
 * @return {number}
 */
// 暴力递归
// 时间复杂度O(2^(n+m)) 空间复杂度O(n+m)
var minPathSum = function (grid, i = grid.length - 1, j = grid[0].length - 1) {
  if (i < 0 || j < 0) return Infinity;
  if (i === 0 && j === 0) return grid[i][j];
  return (
    Math.min(minPathSum(grid, i - 1, j), minPathSum(grid, i, j - 1)) +
    grid[i][j]
  );
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
// 记忆化递归
var minPathSum = function (
  grid,
  i = grid.length - 1,
  j = grid[0].length - 1,
  caches = Array.from({ length: grid.length }, () => [])
) {
  if (i < 0 || j < 0) return Infinity;
  if (i === 0 && j === 0) return grid[i][j];
  if (caches[i][j]) return caches[i][j];
  return (caches[i][j] =
    Math.min(
      minPathSum(grid, i - 1, j, caches),
      minPathSum(grid, i, j - 1, caches)
    ) + grid[i][j]);
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
// 动态规划
// 时间复杂度O(n*m) 空间复杂度O(n+m)
/*
 * 初始状态：[[1, 0, 0], [0, 0, 0], [0, 0, 0]]
 * 状态转移方程：dp[i, j] = Math.min(dp[i - 1, j], dp[i, j - 1]) + grid[i, j]
 * dp表：[[1, 4, 5], [2, 7, 6], [6, 8, 7]]
 */
var minPathSum = (grid, m = grid.length, n = grid[0].length) => {
  // 初始化 dp 表
  const dp = Array.from({ length: m }, () => []);
  dp[0][0] = grid[0][0];
  // 状态转移：首列
  for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
  // 状态转移：首行
  for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];
  // 状态转移：其余行和列
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }
  return dp[m - 1][n - 1];
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
// 动态规划 空间优化
// 时间复杂度O(n*m) 空间复杂度O(m)
var minPathSum = (grid, m = grid.length, n = grid[0].length) => {
  const dp = [grid[0][0]];
  // 状态转移 首行
  for (let j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
  // 状态转移：其余行和列
  for (let i = 1; i < m; i++) {
    dp[0] = dp[0] + grid[i][0];
    for (let j = 1; j < n; j++) {
      dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
    }
  }
  return dp[n - 1];
};

console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
); // 7
