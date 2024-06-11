// https://leetcode-cn.com/problems/surrounded-regions/solution/
// 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// DFS
var solve = function (board) {
  if (!board || !board.length) return board;
  var h = board.length,
    w = board[0].length,
    dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  for (let i = 0; i < h; i++) {
    if (board[i][0] === 'O') go(i, 0);
    if (board[i][w - 1] === 'O') go(i, w - 1);
  }
  for (let j = 0; j < w; j++) {
    if (board[0][j] === 'O') go(0, j);
    if (board[h-1][j] === 'O') go(h - 1, j);
  }
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (board[i][j] === 'O') board[i][j] = 'X';
      if (board[i][j] === 'B') board[i][j] = 'O';
    }
  }
  return board;
  function go(x, y) {
    board[i][j] = 'B';
    for (const [dx, dy] of dir) {
      var i = x + dx,
        j = y + dy;
      if (i >= 0 && i < h && j >= 0 && j < w && board[i][j] === 'O') {
        go(i, j);
      }
    }
  }
};