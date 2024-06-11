// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/

// dp方程：
// dp状态记录当天手上有股票或者没有股票的状态,会叠加上一次的计算结果
// dp[i][1] = max{dp[i-1][1], dp[i-2][0] - p[i]} // 当天有股票 
// dp[i][0] = max{dp[i-1][0], dp[i-1][1] + p[i]} // 当天没有股票

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(n)
var maxProfit = function(prices) {
	var len = prices.length,
		dp = [[0, -prices[0]]];
	for (var i = 1; i < len; i++) {
		dp[i] = [];
		if (i === 1) 
			dp[i][1] = Math.max(dp[i-1][1], -prices[i]);
		else  
			dp[i][1] = Math.max(dp[i-1][1], dp[i-2][0] - prices[i]);
		dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
	}
	return dp[dp.length-1][0];
};

console.log(maxProfit([1, 2, 3, 0, 2])); // 3
console.log(maxProfit([1, 2, 3])); // 2
console.log(maxProfit([1, 2, 3, 0, 2, 10, 8, 7, 5, 9])); // 15