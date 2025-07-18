// https://leetcode-cn.com/problems/climbing-stairs/
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

/**
 * @param {number} n
 * @return {number}
 */
// 回溯
var climbStairs = function (n) {
	if (n < 0) return 0;
	if (n === 0) return 1;
	let result = 0;
	for (let step of [1, 2]) result += climbStairs(n - step);
	return result;
};

/**
 * @param {number} n
 * @return {number}
 */
// 基于[推论]: 爬到第i阶的方案数 = 爬到第[i - 1]阶的方案数 + 爬到第[i - 2]阶的方案数 暴力递归
// 以dp[n]为起点，递归地将一个较大问题拆解为两个较小问题的和，直至到达最小子问题 dp[1]和dp[2]时返回。其中，最小子问题的解是已知的，即dp[1] = 1、dp[2] = 2，标识爬到第1和2阶分别有1和2种方案
var climbStairs = function (n) {
	if (n <= 2) return n;
	return climbStairs(n - 1) + climbStairs(n - 2);
};

/**
 * @param {number} n
 * @return {number}
 */
// 基于[推论]: 爬到第i阶的方案数 = 爬到第[i - 1]阶的方案数 + 爬到第[i - 2]阶的方案数 记忆化递归
var climbStairs = function (n, caches = [0, 1, 2]) {
	if (caches[n]) return caches[n];
	return (caches[n] = climbStairs(n - 1, caches) + climbStairs(n - 2, caches));
};

/**
 * @param {number} n
 * @return {number}
 */
// 动态规划
/* 
	动规五部曲
		1.确定dp表及其下标的含义 爬到第i阶有dp[i]种方法
		2.确定递推公式 dp[i] = dp[i - 1] + dp[i - 2]
		3.dp表初始化 [1, 2]
		4.确定遍历顺序 从左至右遍历
		5.填充dp表 [1, 2, 3, 5, 8, 13, 21, 34, 55]
*/
var climbStairs = function (n) {
	const dp = [0, 1, 2];
	for (let i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
	return dp[n];
	// 状态压缩
	if (n <= 2) return n;
	let dp1 = 1,
		dp2 = 2;
	for (let i = 3; i <= n; i++) [dp1, dp2] = [dp2, dp1 + dp2];
	return dp2;
};

// 变形1：爬楼梯最小代价
// 给定一个楼梯，你每步可以上1阶或者2阶，每一阶楼梯上都贴有一个非负整数，表示你在该台阶所需要付出的代价。
// 给定一个非负整数数组cost，其中cost[i]表示在第i个台阶需要付出的代价，cost[0]为地面（起始点）。请计算最少需要付出多少代价才能到达顶部？
/**
 * @param {number[]} cost
 * @return {number}
 */
/*
 * cost = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * 初始状态：dp[1] = cost[1], dp[2] = cost[2]
 * 状态转移方程：dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i]
 * dp表 [ 0, 1, 2, 5, 7, 11, 14, 19, 23 ]
 */
function minCostClimbingStairs(cost) {
	if (cost.length <= 2) return cost[cost.length - 1];
	// const dp = [cost[0], cost[1]];
	// for (let i = 2; i < cost.length; i++)
	//   dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
	// return dp[cost.length - 1];
	let dp0 = cost[0],
		dp1 = cost[1];
	for (let i = 2; i < cost.length; i++) [dp0, dp1] = [dp1, Math.min(dp0, dp1) + cost[i]];
	return dp1;
}

// 变形2：带约束爬楼梯
// 给定一个共有n阶的楼梯，你每步可以上1阶或者2阶，但不能连续两轮跳1阶，请问有多少种方案可以爬到楼顶？
/**
 * @param {number} n
 * @return {number}
 */
/*
 * 初始状态：dp[0] = [1, 0], dp[1] = [0, 1];
 * 状态转移方程组：dp[i][0] = dp[i - 1][1] & dp[i][1] = dp[i - 2][0] + dp[i - 2][1]
 * dp表：[[1, 0], [0, 2], [2, 1], [1, 2], [2, 3], [3, 3], [3, 5], [5, 6], [6, 8]]
 */
function climbingStairsConstraint(n) {
	if (n <= 2) return 1;
	let dp0 = [1, 0],
		dp1 = [0, 1];
	for (let i = 2; i < n; i++) [dp0, dp1] = [[...dp1], [dp1[1], dp0[0] + dp0[1]]];
	return dp1[0] + dp1[1];
	// if (n <= 2) return 1;
	// const dp = [
	//   [1, 0],
	//   [0, 1],
	// ];
	// for (let i = 2; i < n; i++) {
	//   dp[i] = [];
	//   dp[i][0] = dp[i - 1][1];
	//   dp[i][1] = dp[i - 2][0] + dp[i - 2][1];
	// }
	// return dp[n - 1][0] + dp[n - 1][1];
}

// 变形3:步数不一定
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n, steps) {
	let dp = Array(n).fill(0);
	for (let i = 0; i < n; i++) {
		for (step of steps) {
			if (i === step) dp[i] += 1;
			else if (i > step) dp[i] += dp[i - step];
		}
	}
	return dp[n - 1];
};

console.log(climbStairs(8, [1, 2, 5]));

// 变形4: 步数为数组且相邻步伐不能相同
/**
 * @param {number} n
 * @return {number}
 */

var climbStairs = function (n, steps) {
	var len = steps.length,
		dp = Array(n).fill(0);
	for (var i = 0; i < n; i++) {
		for (j = 0; j < len; j++) {
			for (var k = 0; k < len; k++) {}
		}
	}
	return dp[n - 1];
};
