// https://leetcode.cn/problems/wiggle-subsequence/description/

// 如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为 摆动序列 。第一个差（如果存在的话）可能是正数或负数。仅有一个元素或者含两个不等元素的序列也视作摆动序列。
// 例如， [1, 7, 4, 9, 2, 5] 是一个 摆动序列 ，因为差值 (6, -3, 5, -7, 3) 是正负交替出现的。
// 相反，[1, 4, 7, 2, 5] 和 [1, 7, 4, 5, 5] 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。
// 子序列 可以通过从原始序列中删除一些（也可以不删除）元素来获得，剩下的元素保持其原始顺序。
// 给你一个整数数组 nums ，返回 nums 中作为 摆动序列 的 最长子序列的长度 。

/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
	const n = nums.length;
	if (n < 2) return n; // 如果数组长度小于 2，直接返回长度

	let up = 1; // 记录以上升结尾的最长摆动子序列长度
	let down = 1; // 记录以下降结尾的最长摆动子序列长度

	// 遍历数组
	for (let i = 1; i < n; i++) {
		if (nums[i] > nums[i - 1]) {
			// 当前数字比前一个数字大，更新上升长度
			up = down + 1;
		} else if (nums[i] < nums[i - 1]) {
			// 当前数字比前一个数字小，更新下降长度
			down = up + 1;
		}
		// 如果 nums[i] == nums[i - 1]，则跳过，不更新 up 和 down
	}

	// 返回最长摆动子序列的长度
	return Math.max(up, down);
};
