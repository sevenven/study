// https://leetcode-cn.com/problems/coin-change-2/

// dp方程：dp[i] = coin of coins -> dp[i] = dp[i] + dp[i-coin]

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
// 时间复杂度 O(n*m) 空间复杂度O(n)s
var change = function(amount, coins) {
  var dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (coin of coins) {
    for (var i = coin; i <= amount; i++) {
      dp[i] += dp[i-coin];
    }
  }
  return dp[amount];
};

console.log(change(5, [1, 2, 5])); // 4
console.log(change(3, [2])); // 0
console.log(change(10, [10])); // 1