// https://leetcode.cn/problems/non-decreasing-subsequences/description/

// 给你一个整数数组 nums ，找出并返回所有该数组中不同的递增子序列，递增子序列中 至少有两个元素 。你可以按 任意顺序 返回答案。
// 数组中可能含有重复元素，如出现两个整数相等，也可以视作递增序列的一种特殊情况。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums, startIndex = 0, path = [], result = []) {
	if (path.length >= 2 && isValid(path)) result.push([...path]);
	let set = new Set();
	for (let i = startIndex; i < nums.length; i++) {
		if (set.has(nums[i])) continue;
		path.push(nums[i]);
		set.add(nums[i]);
		findSubsequences(nums, i + 1, path, result);
		path.pop();
	}
	return result;
};

function isValid(nums) {
	for (let i = 0; i <= nums.length - 2; i++) if (nums[i] > nums[i + 1]) return false;
	return true;
}

console.log(findSubsequences([4, 6, 6, 7]));
