// https://leetcode.cn/problems/product-of-array-except-self/
// 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
// 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
// 请不要使用除法，且在 O(n) 时间复杂度内完成此题。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 暴力解法
// 时间复杂度O(n^2) 空间复杂度O(1)
var productExceptSelf = function (nums) {
	const answer = Array(nums.length).fill(1);
	for (let i = 0; i < nums.length; i++) {
		for (let j = 0; j < nums.length; j++) {
			if (i !== j) answer[i] *= nums[j];
		}
	}
	return answer;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 左侧乘积*右侧乘积
// 时间复杂度O(n) 空间复杂度O(n)
var productExceptSelf = function (nums) {
	const left = Array(nums.length).fill(1),
		right = Array(nums.length).fill(1),
		answer = Array(nums.length).fill(1);
	for (let i = 1; i < nums.length; i++) left[i] = left[i - 1] * nums[i - 1];
	for (let i = nums.length - 2; i >= 0; i--) right[i] = right[i + 1] * nums[i + 1];
	for (let i = 0; i < nums.length; i++) answer[i] = left[i] * right[i];
	return answer;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 左侧乘积*右侧乘积---代码优化
// 时间复杂度O(n) 空间复杂度O(1)
var productExceptSelf = function (nums) {
	let answer = Array(nums.length).fill(1),
		R = nums[nums.length - 1];
	for (let i = 1; i < nums.length; i++) answer[i] = answer[i - 1] * nums[i - 1];
	for (let i = nums.length - 2; i >= 0; i--) {
		answer[i] *= R;
		R *= nums[i];
	}
	return answer;
};

console.log(productExceptSelf([1, 2, 3, 4])); // [ 24, 12, 8, 6 ]
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [ -0, 0, 9, -0, 0 ]
