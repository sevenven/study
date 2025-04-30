// https://leetcode.cn/problems/min-cost-climbing-stairs/description/
// 给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。
// 你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
// 请你计算并返回达到楼梯顶部的最低花费。

// 2 <= cost.length <= 1000
// 0 <= cost[i] <= 999

/**
 * @param {number[]} cost
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度[O(n)|O(1)]
/* 
	动规五部曲
		1.确定dp表及其下标的含义 dp[i] 为到达第 i 个台阶的最小费用
		2.确定递推公式 dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
		3.dp表初始化 [0, 0]
		4.确定遍历顺序 从左至右遍历
		5.填充dp表
*/
var minCostClimbingStairs = function (cost) {
	// const dp = [0, 0];
	// for (let i = 2; i <= cost.length; i++)
	//   dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
	// return dp[cost.length];
	let dp0 = 0,
		dp1 = 0;
	for (let i = 2; i <= cost.length; i++) [dp0, dp1] = [dp1, Math.min(dp1 + cost[i - 1], dp0 + cost[i - 2])];
	return dp1;
};

// 边界情况：有两个台阶
console.log(minCostClimbingStairs([10, 15])); // 输出: 10
// 常规情况：多个台阶
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 输出: 6
// 常规情况：多个台阶
console.log(minCostClimbingStairs([10, 15, 20, 25, 30, 35])); // 输出: 60
