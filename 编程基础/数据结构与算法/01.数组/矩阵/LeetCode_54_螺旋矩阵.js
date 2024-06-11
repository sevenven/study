// https://leetcode.cn/problems/spiral-matrix/description/
// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
	let L = 0,
		R = matrix[0].length - 1,
		U = 0,
		D = matrix.length - 1,
		result = [];
	while (true) {
		for (let i = L; i <= R; i++) result.push(matrix[U][i]);
		if (++U > D) break;
		for (let i = U; i <= D; i++) result.push(matrix[i][R]);
		if (L > --R) break;
		for (let i = R; i >= L; i--) result.push(matrix[D][i]);
		if (U > --D) break;
		for (let i = D; i >= U; i--) result.push(matrix[i][L]);
		if (++L > R) break;
	}
	return result;
};

console.log(
	spiralOrder([
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	])
);

console.log(
	spiralOrder([
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12]
	])
);
