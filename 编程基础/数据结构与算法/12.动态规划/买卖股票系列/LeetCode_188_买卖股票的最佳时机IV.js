// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/

// dp方程：
// dp[i][k][1] = max{dp[i-1][k][1], dp[i-1][k-1][0] - p[i]} // 第k次交易买入
// dp[i][k][0] = max{dp[i-1][k][0], dp[i-1][k][1] + p[i]} // 第k次交易卖出

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (times, prices) {
	var len = prices.length,
		dp = [];
	if (times >= len >> 1) return maxProfit_inf(prices);
	for (var i = 0; i < len; i++) {
		dp[i] = [];
		for (var k = 0; k <= times; k++) {
			dp[i][k] = [];
			if (i === 0 || k === 0) {
				dp[i][k][1] = -prices[i];
				dp[i][k][0] = 0;
				continue;
			}
			dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
			dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
		}
	}
	return dp[len - 1][times][0];
};

var maxProfit_inf = function (prices) {
	var dp0 = 0,
		dp1 = -Number.MAX_SAFE_INTEGER;
	for (price of prices) {
		var temp = dp1;
		dp1 = Math.max(dp1, dp0 - price);
		dp0 = Math.max(dp0, temp + price);
	}
	return dp0;
};

console.log(maxProfit(2, [2, 4, 1])); // 2
console.log(maxProfit(1, [7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit(3, [1, 2])); // 1
console.log(maxProfit(3, [1])); // 0
console.log(maxProfit(2, [0, 8, 5, 7, 4, 7])); // 11
console.log(maxProfit(2, [2, 1, 4, 5, 2, 9, 7])); // 11
