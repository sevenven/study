// https://leetcode-cn.com/problems/jump-game/
// 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var canJump = function (nums) {
	if (nums.length === 1) return true; // 单个元素的情况

	let cover = 0; // 当前能覆盖的最远距离

	// 只需要遍历到当前覆盖范围
	for (let i = 0; i <= cover; i++) {
		// 更新最远覆盖范围
		cover = Math.max(cover, i + nums[i]);

		// 如果覆盖范围已经可以到达终点，直接返回true
		if (cover >= nums.length - 1) return true;
	}

	return false; // 无法到达终点
};

// 示例1：可以到达终点
console.log(canJump([2, 3, 1, 1, 4])); // 输出: true
// 示例2：无法到达终点
console.log(canJump([3, 2, 1, 0, 4])); // 输出: false
// 示例3：单个元素
console.log(canJump([0])); // 输出: true
// 示例4：全零数组（除第一个元素外）
console.log(canJump([2, 0, 0, 0])); // 输出: false
// 示例5：刚好能到达终点
console.log(canJump([1, 1, 1, 1])); // 输出: true
