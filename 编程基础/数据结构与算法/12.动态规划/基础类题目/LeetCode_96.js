// https://leetcode.cn/problems/unique-binary-search-trees/description/

// 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？
// 返回满足题意的二叉搜索树的种数。

/**
 * @param {number} n
 * @return {number}
 */
/* 
	动规五部曲
		1.确定dp表及其下标的含义 i个不同元素节点组成的二叉搜索树的个数为dp[i]
		2.确定递推公式 dp[i] += dp[j - 1] * dp[i - j];
		3.dp表初始化 [1, 1]
		4.确定遍历顺序
		5.填充dp表
*/
// 动态规划 时间复杂度O() 空间复杂度O()
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
};
