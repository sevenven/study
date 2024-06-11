// https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/description/

// 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。
// 也就是：F(0) = 0，F(1) = 1 F(n) = F(n - 1) + F(n - 2)，其中 n > 1
// 给定 n ，请计算 F(n) 。

/**
 * @param {number} n
 * @return {number}
 */
// 动态规划 时间复杂度O(n) 空间复杂度[O(n)|O(1)]
/* 
	动规五部曲
		1.确定dp表及其下标的含义 第i个斐波那契数的值为dp[i]
		2.确定递推公式 dp[i] = dp[i - 1] + dp[i - 2]
		3.dp表初始化 [0, 1]
		4.确定遍历顺序 从左至右遍历
		5.填充dp表
*/
var fib = function (n) {
  // const MOD = 1000000007;
  // const dp = [0, 1];
  // for (let i = 2; i <= n; i++) dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
  // return dp[n];
  if (n < 2) return n;
  const MOD = 1000000007;
  let dp0 = 0,
    dp1 = 1;
  for (let i = 2; i <= n; i++) [dp0, dp1] = [dp1, (dp0 + dp1) % MOD];
  return dp1;
};
