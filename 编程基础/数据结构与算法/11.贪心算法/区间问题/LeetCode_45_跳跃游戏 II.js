// https://leetcode-cn.com/problems/jump-game-ii/
// 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。
// 每个元素 nums[i] 表示从索引 i 向后跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:
// 0 <= j <= nums[i]
// i + j < n
// 返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 时间复杂度O(n^2) 空间复杂度O(1)
var jump = function (nums) {
	var lastPos = nums.length - 1,
		steps = 0;
	while (lastPos != 0) {
		for (var i = 0; i < lastPos; i++) {
			if (nums[i] + i >= lastPos) {
				lastPos = i;
				steps++;
				break;
			}
		}
	}
	return steps;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var jump = function (nums) {
	var len = nums.length - 1,
		maxPos = 0,
		end = 0,
		steps = 0;
	for (var i = 0; i < len; i++) {
		maxPos = Math.max(maxPos, nums[i] + i);
		if (i === end) {
			end = maxPos;
			steps++;
		}
	}
	return steps;
};

console.log(jump([2, 3, 1, 1, 4])); // 2
