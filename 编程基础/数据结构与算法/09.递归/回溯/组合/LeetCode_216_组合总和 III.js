// https://leetcode.cn/problems/combination-sum-iii/description/

// 找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：
// 只使用数字1到9
// 每个数字 最多使用一次
// 返回 所有可能的有效组合的列表 。该列表不能包含相同的组合两次，组合可以以任何顺序返回。

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
// 回溯 + 剪枝
var combinationSum3 = function (k, n, startIndex = 1, path = [], result = []) {
	if (n < 0) return result; // 剪枝：如果当前总和已经小于0 则直接返回
	if (n === 0 && path.length === k) {
		result.push([...path]);
		return result;
	}
	// 剪枝： 如果剩下的数字不够选了 则不在进行计算
	for (let i = startIndex; i <= 9 - (k - path.length) + 1; i++) {
		path.push(i);
		// n&startIndex: 隐藏回溯
		combinationSum3(k, n - i, i + 1, path, result);
		path.pop(); // 标准回溯
	}
	return result;
};
