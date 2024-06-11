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
	console.log(nums);
	let result = [],
		L,
		R;
	for (let i = 0; i <= nums.length - 4; i++) {
		if (nums[i] >= 0 && nums[i] > target) break;
		if (i > 0 && nums[i] === nums[i - 1]) continue;
		for (let j = i + 1; j <= nums.length - 3; j++) {
			if (nums[i] + nums[j] >= 0 && nums[i] + nums[j] > target) break;
			if (j > i + 1 && nums[j] === nums[j - 1]) continue;
			L = j + 1;
			R = nums.length - 1;
			while (L < R) {
				const sum = nums[i] + nums[j] + nums[L] + nums[R];
				if (sum === target) {
					console.log(i, j, L, R);
					result.push([nums[i], nums[j], nums[L++], nums[R--]]);
					while (L < R && nums[L] === nums[L - 1]) L++;
					while (L < R && nums[R] === nums[R + 1]) R--;
				} else if (sum < target) {
					L++;
				} else {
					R--;
				}
			}
		}
	}
	return result;
};

console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
console.log(fourSum([-3, -1, 0, 2, 4, 5], 0));
