// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/

// dp方程：
// dp[i][k][1] = max{dp[i-1][k][1], dp[i-1][k-1][0] - p[i]} // 当天当次手里有股票
// dp[i][k][0] = max{dp[i-1][k][0], dp[i-1][k][1] + p[i]} // 当天当次手里没有股票

/**
 * @param {number[]} prices
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(n)
var maxProfit = function(prices) {
	var len = prices.length,
		dp = [];
	for (var i = 0; i < len; i++) {
		dp[i] = [];
		for (var k = 0; k <= 2; k++) {
			dp[i][k] = [];
			if (i === 0 || k === 0) {
				dp[i][k][1] = -prices[i];
				dp[i][k][0] = 0;
				continue;
			}
			dp[i][k][1] = Math.max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]);
			dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
		}
	}
	return dp[len-1][2][0];
};

console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4])); // 6
console.log(maxProfit([1, 2, 3, 4, 5])); // 4

