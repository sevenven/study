// https://leetcode-cn.com/problems/rotate-array/
// 给你一个数组，将数组中的元素向右轮转k个位置，其中k是非负数。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 暴力解法
// 时间复杂度O(k*n) 空间复杂度O(1)
var rotate = function (nums, k) {
	let temp;
	for (let i = 0; i < k % nums.length; i++) {
		temp = nums[nums.length - 1];
		for (let j = nums.length - 2; j >= 0; j--) nums[j + 1] = nums[j];
		nums[0] = temp;
	}
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 对称交换
// 时间复杂度O(n) 空间复杂度O(1)
var rotate = function (nums, k) {
	k = k % nums.length;
	swap(nums, 0, nums.length - 1);
	swap(nums, 0, k - 1);
	swap(nums, k, nums.length - 1);
};
function swap(nums, L, R) {
	while (L < R) [nums[L++], nums[R--]] = [nums[R], nums[L]];
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 环状替换解法
// 时间复杂度O(n) 空间复杂度O(1)
var rotate = function (nums, k) {
	k = k % nums.length;
	let cur, curIndex, moveIndex;
	for (let i = 0, count = 0; count < nums.length; i++) {
		cur = nums[(curIndex = i)];
		do {
			moveIndex = (curIndex + k) % nums.length;
			[nums[moveIndex], cur, curIndex] = [cur, nums[moveIndex], moveIndex];
			count++;
		} while (curIndex !== i);
	}
};

rotate((arr = [1, 2, 3, 4, 5, 6]), 2);
console.log(arr); // [ 5, 6, 1, 2, 3, 4 ]
