// https://leetcode-cn.com/problems/unique-paths-iii/
// 在二维网格 grid 上，有 4 种类型的方格：
// 1 表示起始方格。且只有一个起始方格。
// 2 表示结束方格，且只有一个结束方格。
// 0 表示我们可以走过的空方格。
// -1 表示我们无法跨越的障碍。
// 返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目。
// 每一个无障碍方格都要通过一次，但是一条路径中不能重复通过同一个方格。

/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function (grid) {
  let startX,
    startY,
    count0 = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 0) {
        count0++;
      } else if (grid[i][j] === 1) {
        startX = i;
        startY = j;
      }
    }
  }
  return getPath(grid, startX, startY, count0 + 1);
};

function getPath(grid, x, y, left) {
  if (
    x < 0 ||
    x >= grid.length ||
    y < 0 ||
    y >= grid[0].length ||
    grid[x][y] === -1
  )
    return 0;
  if (grid[x][y] === 2) return left === 0;
  grid[x][y] = -1;
  const reslut =
    getPath(grid, x - 1, y, left - 1) +
    getPath(grid, x + 1, y, left - 1) +
    getPath(grid, x, y - 1, left - 1) +
    getPath(grid, x, y + 1, left - 1);
  grid[x][y] = 0;
  return reslut;
}
