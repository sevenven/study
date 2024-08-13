// https://leetcode-cn.com/problems/move-zeroes
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 暴力破解 自己移动元素
// 时间复杂度O(n^2) 空间复杂度O(1)
var moveZeroes = function (nums) {
	for (let i = 0; i < nums.length - 1; i++) {
		if (nums[i] === 0) {
			for (let j = i; j < nums.length - 1; j++) nums[j] = nums[j + 1];
			nums[nums.length - 1] = 0;
		}
	}
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 快慢指针法-快慢指针一开始都指向0 快指针等于0，只自增快指针|快指针不等于0，交换快慢指针并自增快慢指针
// 时间复杂度O(n) 空间复杂度O(1)
var moveZeroes = function (nums) {
	let sP = 0;
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === 0) continue;
		[nums[sP++], nums[i]] = [nums[i], nums[sP]];
	}
};

moveZeroes((nums = [1, 2, 0, 4, 0, 12]));
console.log(nums); // [1, 2, 4, 12, 0, 0]
