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
// 时间复杂度O(n) 空间复杂度O(1)
var jump = function (nums) {
	if (nums.length <= 1) return 0;

	let curCover = 0;
	let maxCover = 0;
	let step = 0;

	for (let i = 0; i <= maxCover; i++) {
		maxCover = Math.max(maxCover, i + nums[i]);
		if (i === curCover) {
			step++;
			curCover = maxCover;
			if (maxCover >= nums.length - 1) return step;
		}
	}
};

// 测试用例1：标准情况
console.log(jump([2, 3, 1, 1, 4])); // 输出: 2
// 测试用例2：刚好到达
console.log(jump([3, 2, 1])); // 输出: 1
// 测试用例3：大跳跃
console.log(jump([1, 2, 3, 4, 5])); // 输出: 3
// 测试用例4：单元素
console.log(jump([0])); // 输出: 0
// 测试用例5：最小跳跃
console.log(jump([1, 1, 1, 1])); // 输出: 3
