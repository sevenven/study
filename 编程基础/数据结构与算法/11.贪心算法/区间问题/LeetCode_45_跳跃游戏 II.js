// https://leetcode-cn.com/problems/jump-game-ii/

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

console.log(jump([2, 3, 1, 1, 4])) // 2