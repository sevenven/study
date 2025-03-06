// https://leetcode-cn.com/problems/n-queens/
// 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。
// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
// 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
// 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

/**
 * @param {number} n - 棋盘的大小（n x n）
 * @param {number} curRow - 当前正在处理的行
 * @param {number[]} solution - 当前解，记录每一行皇后所在的列
 * @param {string[][]} result - 所有可能的解
 * @return {string[][]}
 */
// 回溯 + 剪枝 写法一
var solveNQueens = function (n, curRow = 0, solution = [], result = []) {
	// 如果当前行 curRow 等于 n，说明已经成功放置了所有皇后
	if (curRow === n) {
		// 将当前解转换为棋盘格式，并加入结果数组
		result.push(solution.map(col => '.'.repeat(col) + 'Q' + '.'.repeat(n - 1 - col)));
		return result;
	}

	// 遍历当前行的每一列，尝试放置皇后
	for (let j = 0; j < n; j++) {
		// 检查同一列是否有皇后&检查主对角线是否有皇后&检查副对角线是否有皇后 如果不符合棋牌规则 跳过
		if (solution.some((col, row) => j === col || curRow + j === row + col || curRow - j === row - col)) continue;
		solution.push(j);
		solveNQueens(n, curRow + 1, solution, result);
		solution.pop(); // 标准回溯：移除当前列，尝试其他可能性
	}
	return result;
};

/**
 * @param {number} n - 棋盘的大小（n x n）
 * @param {Object} col - 记录每一列是否被占用
 * @param {Object} pie - 记录主对角线是否被占用
 * @param {Object} na - 记录副对角线是否被占用
 * @param {number} curRow - 当前正在处理的行
 * @param {number[]} solution - 当前解，记录每一行皇后所在的列
 * @param {string[][]} result - 所有可能的解
 * @return {string[][]}
 */

// 回溯 + 剪枝 写法二
var solveNQueens = function (n, col = {}, pie = {}, na = {}, curRow = 0, solution = [], result = []) {
	if (curRow === n) {
		result.push(solution.map(col => '.'.repeat(col) + 'Q' + '.'.repeat(n - 1 - col)));
		return result;
	}

	// 遍历当前行的每一列，尝试放置皇后
	for (let j = 0; j < n; j++) {
		// 检查当前位置 (curRow, j) 是否与已放置的皇后冲突 如果冲突，跳过当前列
		if (col[j] || pie[curRow + j] || na[curRow - j]) continue;

		// 如果不冲突，将当前列加入解中
		solution.push(j);

		// 标记当前列、主对角线和副对角线为被占用
		col[j] = true;
		pie[curRow + j] = true;
		na[curRow - j] = true;

		// 递归处理下一行
		solveNQueens(n, col, pie, na, curRow + 1, solution, result);

		// 回溯：移除当前列，并取消标记
		solution.pop();
		col[j] = false;
		pie[curRow + j] = false;
		na[curRow - j] = false;
	}

	// 返回所有可能的解
	return result;
};

console.log(solveNQueens(4)); // [['.Q..', '...Q', 'Q...', '..Q.'], ['..Q.', 'Q...', '...Q', '.Q..']]
// console.log(solveNQueens(5));
