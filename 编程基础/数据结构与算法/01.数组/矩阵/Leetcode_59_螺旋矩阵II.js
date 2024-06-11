// https://leetcode.cn/problems/spiral-matrix-ii/description/
// 给你一个正整数n 生成一个包含 1 到 n^2 所有元素 且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

/**
 * @param {number} n
 * @return {number[][]}
 */
/*
 * 模拟顺时针画矩阵的过程 左闭右开
 * 填充上行从左到右
 * 填充右列从上到下
 * 填充下行从右到左
 * 填充左列从下到上
 */
var generateMatrix = function (n) {
	let start = 0,
		loop = (mid = n >> 1),
		count = 1,
		result = Array.from({ length: n }, () => Array(n).fill(0));
	while (loop--) {
		let row = (col = start);
		// 上行从左到右（左闭右开）
		for (; col < n - start - 1; col++) result[row][col] = count++;
		// 右列从上到下（左闭右开）
		for (; row < n - start - 1; row++) result[row][col] = count++;
		// 下行从右到左（左闭右开）
		for (; col > start; col--) result[row][col] = count++;
		// 左列做下到上（左闭右开）
		for (; row > start; row--) result[row][col] = count++;
		// 更新起始位置
		start++;
	}
	if (n % 2 === 1) result[mid][mid] = count++;
	return result;
};

console.table(generateMatrix(5));
console.table(generateMatrix(3));
console.table(generateMatrix(1));
