// https://leetcode-cn.com/problems/subsets/
// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
// 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 回溯
var subsets = function (nums, startIndex = 0, path = [], result = []) {
	result.push([...path]);
	for (let i = startIndex; i < nums.length; i++) {
		path.push(nums[i]);
		subsets(nums, i + 1, path, result); // startIndex: 隐藏回溯
		path.pop(); // 标准回溯
	}
	return result;
};

console.log(subsets([1, 2, 3])); // [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]
