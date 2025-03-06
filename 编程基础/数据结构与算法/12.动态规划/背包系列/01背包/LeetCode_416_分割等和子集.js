// https://leetcode.cn/problems/partition-equal-subset-sum/description/

// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

/**
 * @param {number[]} nums
 * @return {boolean}
 */
/* 
	动规五部曲
		1.确定dp表及其下标的含义
		2.确定递推公式
		3.dp表初始化
		4.确定遍历顺序
		5.填充dp表
*/
var canPartition = function (nums) {
	const sum = nums.reduce((prev, cur) => prev + cur);
	if (sum % 2 === 1) return false;
	const target = sum >> 1;
	const dp = Array(target + 1).fill(0);
	for (let i = 0; i < nums.length; i++) {
		for (let j = target; j >= nums[i]; j--) {
			dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
		}
	}
	return dp[target] === target;
};

canPartition([1, 5, 11, 5]);
