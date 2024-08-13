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
// 时间复杂度O() 空间复杂度O()
var generateMatrix = function (n) {
	let start = 0,
		end = n - 1,
		loop = (mid = n >> 1),
		count = 1,
		result = Array.from({ length: n }, () => Array(n).fill(0));
	while (loop--) {
		for (let j = start; j < end; j++) result[start][j] = count++;
		for (let i = start; i < end; i++) result[i][end] = count++;
		for (let j = end; j > start; j--) result[end][j] = count++;
		for (let i = end; i > start; i--) result[i][start] = count++;
		// 更新起点&终点
		start++;
		end--;
	}
	if (n % 2) result[mid][mid] = count++;
	return result;
};

console.table(generateMatrix(5));
console.table(generateMatrix(3));
console.table(generateMatrix(1));
