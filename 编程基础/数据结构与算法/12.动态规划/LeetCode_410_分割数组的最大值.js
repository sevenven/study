// https://leetcode-cn.com/problems/split-array-largest-sum/

// 给定一个非负整数数组 nums 和一个整数 k ，你需要将这个数组分成 k 个非空的连续子数组。
// 设计一个算法使得这 k 个子数组各自和的最大值最小。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function (nums, k) {
	var n = nums.length,
		ans = Infinity;
	dfs(nums, 0, 0, 0, 0);
	return ans;
	function dfs(nums, index, subArrNums, curSum, curMax) {
		if (index === n && subArrNums === k) {
			ans = Math.min(ans, curMax);
			return;
		}
		if (index === n) return;
		if (index > 0) dfs(nums, index + 1, subArrNums, curSum + nums[index], Math.max(curMax, curSum + nums[index]));
		if (subArrNums < k) dfs(nums, index + 1, subArrNums + 1, nums[index], Math.max(curMax, nums[index]));
	}
};

console.log(splitArray([7, 2, 5], 2));
// console.log(splitArray([7, 2, 5, 10, 8], 2));
