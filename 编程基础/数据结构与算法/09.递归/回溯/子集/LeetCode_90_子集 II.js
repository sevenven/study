// https://leetcode.cn/problems/subsets-ii/description/

// 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的 子集（幂集）。
// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
	nums.sort((a, b) => a - b); // 排序
	return backtracking(nums);
};

function backtracking(nums, startIndex = 0, path = [], result = []) {
	result.push([...path]);
	for (let i = startIndex; i < nums.length; i++) {
		if (i > startIndex && nums[i] === nums[i - 1]) continue; // 去重
		path.push(nums[i]);
		backtracking(nums, i + 1, path, result); // startIndex: 隐藏回溯
		path.pop(); // 标准回溯
	}
	return result;
}

console.log(subsetsWithDup([1, 2, 2]));
