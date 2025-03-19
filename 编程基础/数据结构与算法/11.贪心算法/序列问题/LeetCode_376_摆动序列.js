// https://leetcode.cn/problems/wiggle-subsequence/
// 如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为 摆动序列 。
// 第一个差（如果存在的话）可能是正数或负数。仅有一个元素或者含两个不等元素的序列也视作摆动序列。
// 例如， [1, 7, 4, 9, 2, 5] 是一个 摆动序列 ，因为差值 (6, -3, 5, -7, 3) 是正负交替出现的。
// 相反，[1, 4, 7, 2, 5] 和 [1, 7, 4, 5, 5] 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。
// 子序列 可以通过从原始序列中删除一些（也可以不删除）元素来获得，剩下的元素保持其原始顺序。
// 给你一个整数数组 nums ，返回 nums 中作为 摆动序列 的 最长子序列的长度 。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var wiggleMaxLength = function (nums) {
	if (nums.length <= 1) return nums.length;
	let preDiff = 0; // 前一个差值
	let curDiff = 0; // 当前差值
	let result = 1; // 记录峰值的个数
	// 遍历数组，寻找峰值
	for (let i = 1; i < nums.length; i++) {
		curDiff = nums[i] - nums[i - 1]; // 计算当前差值
		// 出现峰值或谷值的情况：
		// 1. preDiff < 0 且 curDiff > 0 说明出现波峰
		// 2. preDiff > 0 且 curDiff < 0 说明出现波谷
		// tips：当preDiff为0时，是序列的起始位置，需要判断
		if ((preDiff <= 0 && curDiff > 0) || (preDiff >= 0 && curDiff < 0)) {
			result++;
			preDiff = curDiff; // 只有在出现峰值时才更新preDiff，这样可以避免连续相同的差值的情况
		}
	}
	return result;
};

// 测试用例1
console.log(wiggleMaxLength([1, 7, 4, 9, 2, 5])); // 输出: 6
// 测试用例2
console.log(wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8])); // 输出: 7
// 测试用例3：处理相等元素
console.log(wiggleMaxLength([1, 2, 2, 2, 1])); // 输出: 2
// 测试用例4：单调序列
console.log(wiggleMaxLength([1, 2, 3, 4, 5])); // 输出: 2
// 测试用例5：空序列和单个元素
console.log(wiggleMaxLength([])); // 输出: 0
console.log(wiggleMaxLength([1])); // 输出: 1
