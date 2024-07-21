// https://leetcode.cn/problems/squares-of-a-sorted-array/description/
// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 暴力法
// 时间复杂度O(nlogn) 空间复杂度O(1)
var sortedSquares = function (nums) {
	const result = [];
	for (let i = 0; i < nums.length; i++) result[i] = nums[i] * nums[i];
	return result.sort((a, b) => a - b);
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 双指针法
// 时间复杂度O(n) 空间复杂度O(1)
var sortedSquares = function (nums) {
	let L = 0,
		R = (p = nums.length - 1),
		LSquare,
		RSquare,
		result = [];
	while (L <= R) {
		LSquare = nums[L] * nums[L];
		RSquare = nums[R] * nums[R];
		if (LSquare >= RSquare) {
			result[p--] = LSquare;
			L++;
		} else {
			result[p--] = RSquare;
			R--;
		}
	}
	return result;
};

console.log(sortedSquares([-4, -1, 0, 3, 10]));
console.log(sortedSquares([-7, -3, 2, 3, 11]));
