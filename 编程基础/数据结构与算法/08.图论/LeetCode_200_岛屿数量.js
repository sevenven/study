// https://leetcode-cn.com/problems/number-of-islands/
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
// 此外，你可以假设该网格的四条边均被水包围。

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  let h = grid.length,
    w = grid[0].length,
    dir = [[-1, 0], [0, 1], [1, 0], [0, -1]],
    nums = 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (grid[i][j] === '1') {
        nums++;
        go(i, j);
      }
    }
  }
  return nums;
  function go (x, y) {
    grid[x][y] = '0';
    for (const [dx, dy] of dir) {
      var i = x + dx,
        j = y + dy;
      if (i >= 0 && i < h && j >= 0 && j < w && grid[i][j] === '1') 
        go(i, j);
    }
  }
};

var res1 = numIslands([
	[1, 1, 1, 1, 0],
	[1, 1, 0, 1, 0],
	[1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0]
])
console.log(res1); // 1
var res2 = numIslands([
	[1, 1, 0, 0, 0],
	[1, 1, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 1, 1]
])
console.log(res2); // 3