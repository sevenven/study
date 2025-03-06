// https://leetcode.cn/problems/target-sum/description/

// 给你一个非负整数数组 nums 和一个整数 target 。
// 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
// 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
// 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
/* 
	动规五部曲
		1.确定dp表及其下标的含义 
			dp[i][j]：使用 下标为[0, i]的nums[i]能够凑满j（包括j）这么大容量的包，有dp[i][j]种方法。
			dp[j]：装满背包容量为j有dp[j]种方法
		2.确定递推公式 
		 	dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i]];
			dp[j] = dp[j] + dp[nums[i]]
		3.dp表初始化
		4.确定遍历顺序
		5.填充dp表
*/

const findTargetSumWays = function (nums, target) {
	// const sum = nums.reduce((prev, cur) => prev + cur);
	// if (Math.abs(target) > sum || (sum + target) % 2 === 1) return 0;
	// const addition = (target + sum) / 2;
	// const dp = Array.from({ length: nums.length }, () => Array(addition + 1).fill(0));
	// dp[0][0] = 1;
	// if (nums[0] <= addition) dp[0][nums[0]] = 1;
	// for (let i = 1; i < nums.length; i++) {
	// 	for (let j = 0; j <= addition; j++) {
	// 		j >= nums[i] ? (dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i]]) : (dp[i][j] = dp[i - 1][j]);
	// 	}
	// }
	// return dp[nums.length - 1][addition];
	// 状态压缩
	const sum = nums.reduce((prev, cur) => prev + cur);
	if (Math.abs(target) > sum || (sum + target) % 2 === 1) return 0;
	const addition = (target + sum) / 2;
	const dp = Array(addition + 1).fill(0);
	dp[0] = 1;
	for (let i = 0; i < nums.length; i++) {
		for (let j = addition; j >= nums[i]; j--) {
			dp[j] += dp[j - nums[i]];
		}
	}
	return dp[addition];
};

console.log(findTargetSumWays([1, 1, 1, 1, 1], 3));
