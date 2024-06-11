// https://leetcode-cn.com/problems/word-search/
// 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  if (board.length === 0) return false;
  const h = board.length;
  const w = board[0].length;
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (go(i, j, 0)) return true;
    }
  }
  return false;

  function go(x, y, index) {
    if (board[x][y] !== word[index]) return false;
    if (index === word.length - 1) return true;

    board[x][y] = '*';
    for (const [x, y] of dirs) {
      const i = x + dx;
      const j = y + dy;
      if (i >= 0 && i < h && j >= 0 && j < w) {
        if (go(i, j, index + 1)) return true;
      }
    }
    board[x][y] = word[k];
    return false;
  }
}

var board = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']];
console.log(exist(board, 'ABCCED'));
