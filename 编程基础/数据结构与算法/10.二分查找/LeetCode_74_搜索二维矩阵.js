// https://leetcode-cn.com/problems/search-a-2d-matrix/

// 给你一个满足下述两条属性的 m x n 整数矩阵：
// 每行中的整数从左到右按非严格递增顺序排列。
// 每行的第一个整数大于前一行的最后一个整数。
// 给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// [left, right]写法
// 时间复杂度O(logn) 空间复杂度O(1)
var searchMatrix = function (matrix, target) {
	if (!matrix || !matrix.length) return false;
	let m = matrix.length,
		n = matrix[0].length,
		L = 0,
		R = m * n - 1,
		mid,
		midVal;
	while (L <= R) {
		mid = L + ((R - L) >> 1);
		midVal = matrix[Math.floor(mid / n)][mid % n];
		if (midVal < target) L = mid + 1;
		else if (midVal > target) R = mid - 1;
		else return true;
	}
	return false;
};

var matrix = [
	[1, 3, 5, 7],
	[10, 11, 16, 20],
	[23, 30, 34, 50]
];
console.log(searchMatrix(matrix, 3)); // true
console.log(searchMatrix(matrix, 13)); // false;
