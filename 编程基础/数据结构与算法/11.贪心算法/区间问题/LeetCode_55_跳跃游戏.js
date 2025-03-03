// https://leetcode-cn.com/problems/jump-game/
// 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var canJump = function (nums) {
	var lastPos = nums.length - 1;
	for (var i = nums.length - 2; i >= 0; i--) {
		if (i + nums[i] >= lastPos) lastPos = i;
	}
	return lastPos === 0;
};

console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false
console.log(canJump([2, 0])); // true
