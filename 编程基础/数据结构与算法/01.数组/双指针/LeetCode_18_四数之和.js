// https://leetcode.cn/problems/4sum/description/
// 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。
// 请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
// 0 <= a, b, c, d < n & a、b、c 和 d 互不相同 &nums[a] + nums[b] + nums[c] + nums[d] == target
// 你可以按 任意顺序 返回答案 。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
// 排序加双指针
// 时间复杂度O(n^3) 空间复杂度O(1)
var fourSum = function (nums, target) {
	nums.sort((a, b) => a - b);
	let result = [],
		L,
		R;
	for (let i = 0; i < nums.length - 3; i++) {
		for (let j = i + 1; j < nums.length - 2; j++) {
			L = j + 1;
			R = nums.length - 1;
			while (L < R) {
				const sum = nums[i] + nums[j] + nums[L] + nums[R];
				if (sum == 0) {
					result.push([nums[i], nums[j], nums[L], nums[R]]);
					while (nums[L + 1] === nums[L]) L++;
					while (nums[R - 1] === nums[R]) R--;
					L++;
					R--;
				} else if (sum < 0) {
					L++;
				} else if (sum > 0) {
					R--;
				}
			}
		}
	}
	return result;
};

console.log(fourSum([1, 0, -1, 0, -2, 2], 0)); // [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]];
console.log(fourSum([-3, -1, 0, 2, 4, 5], 0)); // [[-3, -1, 0, 4]];
