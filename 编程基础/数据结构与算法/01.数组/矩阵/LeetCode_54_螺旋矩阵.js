// https://leetcode.cn/problems/spiral-matrix/description/
// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// 时间复杂度O() 空间复杂度O()
var spiralOrder = function (matrix) {
	let start = 0,
		endI = matrix.length - 1,
		endJ = matrix[0].length - 1,
		loop = (mid = Math.min(matrix.length, matrix[0].length) >> 1),
		result = [];
	while (loop--) {
		for (let j = start; j < endJ; j++) result.push(matrix[start][j]);
		for (let i = start; i < endI; i++) result.push(matrix[i][endJ]);
		for (let j = endJ; j > start; j--) result.push(matrix[endI][j]);
		for (let i = endI; i > start; i--) result.push(matrix[i][start]);
		start++;
		endI--;
		endJ--;
	}
	if (Math.min(matrix.length, matrix[0].length) % 2) {
		if (matrix.length < matrix[0].length) {
			for (let j = start; j <= endJ; j++) result.push(matrix[mid][j]);
		} else {
			for (let i = start; i <= endI; i++) result.push(matrix[i][mid]);
		}
	}
	return result;
};

console.log(
	spiralOrder([
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	])
); // [ 1, 2, 3, 6, 9, 8, 7, 4, 5 ]

console.log(
	spiralOrder([
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[10, 11, 12]
	])
); //  [ 1, 2, 3, 6, 9, 12, 11, 10, 7, 4, 5, 8 ]

console.log(
	spiralOrder([
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12]
	])
); // [ 1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7 ]
