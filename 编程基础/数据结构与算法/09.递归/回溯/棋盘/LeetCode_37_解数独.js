// https://leetcode-cn.com/problems/sudoku-solver/
// 编写一个程序，通过填充空格来解决数独问题。
// 数独的解法需 遵循如下规则：
// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
// 数独部分空格内已填入了数字，空白格用 '.' 表示。

/**
 * @param {character[][]} board
 * @return {void} Do not return anything,   modify board in-place instead.
 */
var solveSudoku = function (board) {
	for (let i = 0; i < 9; i++) {
		// 遍历行
		for (let j = 0; j < 9; j++) {
			// 遍历列
			if (board[i][j] !== '.') continue;
			for (let k = 1; k <= 9; k++) {
				// i,j 的位置放 k 是否合适
				if (!isValid(board, i, j, k + '')) continue;
				board[i][j] = k + '';
				if (solveSudoku(board)) return true; // 期盼在某一个递归树的分支填满了 立即返回
				board[i][j] = '.';
			}
			return false; // 9个数都试过了不行 返回false 当前棋盘找不到解决数独问题的解
		}
	}
	return true; // 棋盘填满了
};

function isValid(board, row, col, k) {
	const startX = Math.floor(row / 3) * 3;
	const startY = Math.floor(col / 3) * 3;
	// 判断同行及同列是否有重复
	for (let i = 0; i < 9; i++) {
		if (board[row][i] === k || board[i][col] === k) return false;
	}
	// 判断九宫格里是否有重复
	for (let i = startX; i < startX + 3; i++) {
		for (let j = startY; j < startY + 3; j++) {
			if (board[i][j] === k) return false;
		}
	}
	return true;
}

solveSudoku(
	(arr = [
		['5', '3', '.', '.', '7', '.', '.', '.', '.'],
		['6', '.', '.', '1', '9', '5', '.', '.', '.'],
		['.', '9', '8', '.', '.', '.', '.', '6', '.'],
		['8', '.', '.', '.', '6', '.', '.', '.', '3'],
		['4', '.', '.', '8', '.', '3', '.', '.', '1'],
		['7', '.', '.', '.', '2', '.', '.', '.', '6'],
		['.', '6', '.', '.', '.', '.', '2', '8', '.'],
		['.', '.', '.', '4', '1', '9', '.', '.', '5'],
		['.', '.', '.', '.', '8', '.', '.', '7', '9']
	])
);
console.log(arr);
