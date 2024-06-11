// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

// dp方程：
// dp状态记录当天手上有股票或者没有股票的状态,会叠加上一次的计算结果
// dp[i][1] = max {dp[i-1][1], dp[i-1][0]-p[i]-fee} //当天有股票
// dp[i][0] = max {dp[i-1][0], dp[i-1][1]+p[i]} // 当天没有股票

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
// 写法一
var maxProfit = function (prices, fee) {
	var len = prices.length,
		dp = [[0, -prices[0] - fee]];
	for (var i = 1; i < len; i++) {
		dp[i] = [];
		dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee);
		dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
	}
	return dp[dp.length - 1][0];
};

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
// 写法二
var maxProfit = function (prices, fee) {
	var dp0 = 0,
		dp1 = -Number.MAX_SAFE_INTEGER;
	for (price of prices) {
		var temp = dp1;
		dp1 = Math.max(dp1, dp0 - price - fee);
		dp0 = Math.max(dp0, temp + price);
	}
	return dp0;
};

console.log(maxProfit([1, 3, 2, 8, 4, 9], 2)); // 8
