// https://leetcode.cn/problems/minimum-size-subarray-sum/description/

// 给定一个含有 n 个正整数的数组和一个正整数 target 。
// 找出该数组中满足其总和大于等于 target 的长度最小的 连续子数组[numsl, numsl+1, ..., numsr-1, numsr]
// 并返回其长度
// 如果不存在符合条件的子数组，返回 0 。

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
// 暴力
// 时间复杂度O(n^2) 空间复杂度O(1)
var minSubArrayLen = function (target, nums) {
	let result = Infinity, // 最终的结果
		sum; // 子序列和
	for (let i = 0; i < nums.length; i++) {
		sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j];
			if (sum >= target) result = Math.min(result, j - i + 1);
		}
	}
	return result === Infinity ? 0 : result;
};

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
// 滑动窗口
// 时间复杂度O(n) 空间复杂度O(1)
var minSubArrayLen = function (target, nums) {
	let result = Infinity, // 最终的结果
		sum = 0, // 子序列和
		L = 0; // 滑动窗口起始位置
	for (let R = 0; R < nums.length; R++) {
		sum += nums[R];
		while (sum >= target) {
			result = Math.min(result, R - L + 1);
			sum -= nums[L++];
		}
	}
	return result === Infinity ? 0 : result;
};

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2
console.log(minSubArrayLen(4, [1, 4, 4])); // 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])); // 0
