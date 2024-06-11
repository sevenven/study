// https://leetcode-cn.com/problems/coin-change/

// dp方程：dp[i] = min{dp[i-coin(coin of coins)]} + 1

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// 时间复杂度 O(n*m) 空间复杂度O(n)
var coinChange = function (coins, amount) {
	var dp = [0];
	for (var i = 1; i <= amount; i++) {
		dp[i] = amount + 1;
		for (coin of coins) {
			if (i >= coin) 
				dp[i] = Math.min(dp[i], dp[i-coin] + 1);
		}
	}
	return dp[amount] === amount + 1 ? -1 : dp[amount];
};

console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2, 2, 5], 11)); // 4
console.log(coinChange([2, 5, 10, 1], 27)); // 4
console.log(coinChange([186, 419, 83, 408], 6249)); // 20