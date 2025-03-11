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
	if (nums.length === 1) return 0; // 如果数组长度为1，不需要跳跃
	let jumps = 0; // 跳跃次数
	let curMaxReach = 0; // 当前跳跃能到达的最远位置
	let nextMaxReach = 0; // 下一次跳跃能到达的最远位置
	// 遍历数组（注意：最后一个位置不需要遍历，因为题目保证一定能到达）
	for (let i = 0; i <= nums.length - 2; i++) {
		nextMaxReach = Math.max(nextMaxReach, i + nums[i]); // 更新下一步能到达的最远位置
		// 如果到达当前能到达的最远位置，必须进行一次跳跃
		if (i === curMaxReach) {
			jumps++;
			curMaxReach = nextMaxReach;
		}
	}
	return jumps;
};

console.log(jump([2, 3, 1, 1, 4])); // 2
