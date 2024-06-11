// https://leetcode-cn.com/problems/coin-change/
// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
// 你可以认为每种硬币的数量是无限的。

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  return change(coins, amount, []);
  function change(coins, amount, caches) {
    if (amount === 0) return 0;
    if (caches[amount]) return caches[amount];
    var count = Number.MAX_SAFE_INTEGER;
    for (coin of coins) {
      if (coin > amount) continue;
      var sub = change(coins, amount - coin, caches);
      if (sub === -1) continue;
      count = Math.min(count, sub + 1);
    }
    return (caches[amount] = count === Number.MAX_SAFE_INTEGER ? -1 : count);
  }
};
console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2, 2, 5], 11)); // 4
console.log(coinChange([2, 5, 10, 1], 27)); // 4
console.log(coinChange([186, 419, 83, 408], 6249)); // 20
