// https://leetcode-cn.com/problems/combinations/
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
// 你可以按 任何顺序 返回答案。

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k, startIndex = 1, path = [], result = []) {
	if (path.length === k) {
		result.push([...path]);
		return result;
	}
	for (let i = startIndex; i <= n; i++) {
		path.push(i);
		// startIndex 隐藏回溯
		combine(n, k, i + 1, path, result);
		path.pop(i); // 标准回溯
	}
	return result;
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 回溯 + 剪枝
// 时间复杂度 O(C(n, k)) 空间复杂度 O(k)
var combine = function (n, k, startIndex = 1, path = [], result = []) {
	if (path.length === k) {
		result.push([...path]);
		return result;
	}
	// k - path.length：表示当前组合还需要多少个数字才能达到长度 k & n - (k - path.length) + 1：表示在当前递归层级中，i 的最大值。
	// 如果 i 的值超过了 n - (k - path.length) + 1，那么即使将剩余的所有数字都加入 path，也无法达到长度 k 因此，通过限制 i 的范围，可以避免生成无效的组合
	for (let i = startIndex; i <= n - (k - path.length) + 1; i++) {
		path.push(i);
		// startIndex 隐藏回溯
		combine(n, k, i + 1, path, result);
		path.pop(i); // 标准回溯
	}
	return result;
};
console.log(combine(4, 1)); // [[1], [2], [3], [4]]
console.log(combine(4, 2)); // [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
console.log(combine(4, 3)); // [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]
console.log(combine(4, 4)); // [[1, 2, 3, 4]]
