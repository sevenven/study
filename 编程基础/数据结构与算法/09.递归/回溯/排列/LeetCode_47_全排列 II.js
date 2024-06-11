// https://leetcode-cn.com/problems/permutations-ii/
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 回溯 + 剪枝解法
var permuteUnique = function (nums) {
	nums.sort((a, b) => a - b);
	return backtracking(nums);
};

function backtracking(nums, used = Array.from(nums.length), path = [], result = []) {
	if (path.length === nums.length) {
		result.push([...path]);
		return;
	}
	for (let i = 0; i < nums.length; i++) {
		if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
		if (used[i]) continue;
		path.push(nums[i]);
		used[i] = true;
		backtracking(nums, used, path, result);
		path.pop();
		used[i] = false;
	}
	return result;
}

console.log(permuteUnique([3, 3, 0, 3])); // [[3, 3, 0, 3], [3, 3, 3, 0], [3, 0, 3, 3], [0, 3, 3, 3]]
