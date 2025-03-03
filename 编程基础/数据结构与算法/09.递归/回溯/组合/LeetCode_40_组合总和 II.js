// https://leetcode.cn/problems/combination-sum-ii/description/

// 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用 一次 。
// 注意：解集不能包含重复的组合。

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 回溯
var combinationSum2 = function (candidates, target) {
	candidates.sort((a, b) => a - b); // 排序
	return backtracking(candidates, target);
};

function backtracking(candidates, target, startIndex = 0, path = [], result = []) {
	if (target < 0) return result;
	if (target === 0) {
		result.push([...path]);
		return result;
	}
	for (let i = startIndex; i < candidates.length; i++) {
		if (candidates[i] > target) break; // 剪枝
		if (i > startIndex && candidates[i] == candidates[i - 1]) continue; // 去重
		path.push(candidates[i]);
		// target&startIndex 隐藏回溯
		backtracking(candidates, target - candidates[i], i + 1, path, result);
		path.pop(); // 标准回溯
	}
	return result;
}

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)); // [ [ 1, 1, 6 ], [ 1, 2, 5 ], [ 1, 7 ], [ 2, 6 ] ]
console.log(combinationSum2([2, 5, 2, 1, 2], 5)); // [ [ 1, 2, 2 ], [ 5 ] ]
