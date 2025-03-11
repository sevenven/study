// https://leetcode-cn.com/problems/jump-game/
// 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var canJump = function (nums) {
	let maxReach = 0; // 一开始的时候在起点
	for (let i = 0; i <= nums.length - 1; i++) {
		if (i > maxReach) return false; // 当前位置i超过了maxReach，说明无法继续前进
		maxReach = Math.max(maxReach, i + nums[i]); // 当前能到达的最远位置
		if (maxReach >= nums.length - 1) return true; // 如果【当前能到达的最远位置 >= 数组的最后一个位置】 说明可以到达终点，返回true
	}
	return false; // 如果遍历结束后仍未到达终点，返回false
};

console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false
console.log(canJump([2, 0])); // true
