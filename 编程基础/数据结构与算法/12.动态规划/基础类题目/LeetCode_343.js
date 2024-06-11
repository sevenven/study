// https://leetcode.cn/problems/integer-break/description/

// 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。
// 返回 你可以获得的最大乘积 。

/**
 * @param {number} n
 * @return {number}
 */
/* 
	动规五部曲
		1.确定dp表及其下标的含义 对i进行拆分 可以得到的最大乘积为dp[i]
		2.确定递推公式 dp[i] = max(dp[i], j * (i - j), j * dp[i - j])
		3.dp表初始化
		4.确定遍历顺序
		5.填充dp表
*/
// 动态规划 时间复杂度O() 空间复杂度O()
var integerBreak = function (n) {
  let dp = Array(n + 1).fill(0);
  dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j <= i / 2; j++) {
      dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
    }
  }
  return dp[n];
};
