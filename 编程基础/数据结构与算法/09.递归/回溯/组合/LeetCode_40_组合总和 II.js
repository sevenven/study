// https://leetcode.cn/problems/combination-sum-ii/description/

// 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用 一次 。
// 注意：解集不能包含重复的组合。

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 回溯 + 剪枝
var combinationSum2 = function (candidates, target) {
	candidates.sort((a, b) => a - b);
	return backtracking(candidates, target);
};

function backtracking(candidates, target, startIndex = 0, path = [], result = []) {
	if (target < 0) return;
	if (target === 0) {
		result.push([...path]);
		return;
	}
	for (let i = startIndex; i < candidates.length; i++) {
		if (candidates[i] > target) break;
		if (i > startIndex && candidates[i] == candidates[i - 1]) continue;
		path.push(candidates[i]);
		backtracking(candidates, target - candidates[i], i + 1, path, result);
		path.pop();
	}
	return result;
}

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)); // [ [ 1, 1, 6 ], [ 1, 2, 5 ], [ 1, 7 ], [ 2, 6 ] ]
console.log(combinationSum2([2, 5, 2, 1, 2], 5)); // [ [ 1, 2, 2 ], [ 5 ] ]
