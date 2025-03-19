// https://leetcode-cn.com/problems/maximum-subarray/
// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// 子数组是数组中的一个连续部分。

/**
 * @param {number[]} nums - 整数数组
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var maxSubArray = function (nums) {
	let maxSum = nums[0]; // 记录全局最大和
	let currentSum = nums[0]; // 记录当前连续子数组的和
	for (let i = 1; i < nums.length; i++) {
		currentSum = Math.max(nums[i], currentSum + nums[i]); // 贪心的关键：如果currentSum为负数，那么放弃前面的和重新开始
		maxSum = Math.max(maxSum, currentSum); // 更新全局最大和
	}
	return maxSum;
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
// 示例2：全是正数
console.log(maxSubArray([1, 2, 3, 4, 5])); // 输出: 15
// 示例3：全是负数
console.log(maxSubArray([-1, -2, -3, -4])); // 输出: -1
// 示例4：有0的情况
console.log(maxSubArray([-2, 0, -1])); // 输出: 0
// 示例5：单个元素
console.log(maxSubArray([5])); // 输出: 5
