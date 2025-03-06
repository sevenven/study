// https://leetcode-cn.com/problems/permutations/
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 回溯解法
var permute = function (nums, used = Array.from(nums.length), path = [], result = []) {
	if (path.length === nums.length) {
		result.push([...path]);
		return;
	}
	for (let i = 0; i < nums.length; i++) {
		if (used[i]) continue;
		path.push(nums[i]);
		used[i] = true;
		permute(nums, used, path, result);
		path.pop(); // 标准回溯
		used[i] = false; // 标准回溯
	}
	return result;
};

console.log(permute([1, 2, 3])); // [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
