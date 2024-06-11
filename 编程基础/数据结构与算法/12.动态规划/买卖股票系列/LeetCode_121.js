// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/

/**
 * @param {number[]} prices
 * @return {number}
 */
// 一次遍历
// 时间复杂度O(n) 空间复杂度O(1)
var maxProfit = function(prices) {
	var len = prices.length,
		min = prices[0],
		maxprofit = 0;
	for (var i = 1; i < len; i++) {
		if (prices[i] > min) 
			maxprofit = Math.max(maxprofit, prices[i] - min);
		else 
			min = prices[i];
	}
	return maxprofit;
};

// dp方程：
// dp[i][1] = max{dp[i-1][1], -p[i]} // 当天手上有股票且没有交易过
// dp[i][0] = max{dp[i-1][0], dp[i-1][1] + p[i]} // 当天手上没有股票

/**
 * @param {number[]} prices
 * @return {number}
 */
// 写法一
// 时间复杂度O(n) 空间复杂度O(n)
var maxProfit = function(prices) {
	var len = prices.length,
			dp = [[0, -prices[0]]];
	for (var i = 1; i < len; i++) {
		dp[i] = [];
		dp[i][1] = Math.max(dp[i-1][1], -prices[i]);
		dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
	}
	return dp[dp.length-1][0];
};

/**
 * @param {number[]} prices
 * @return {number}
 */
// 写法二
// 时间复杂度O(n) 空间复杂度O(1)
var maxProfit = function(prices) {
	var dp0 = 0,
			dp1 = -Number.MAX_SAFE_INTEGER;
	for (price of prices) {
		dp0 = Math.max(dp0, dp1 + price);
		dp1 = Math.max(dp1, -price);
	}
	return dp0;
};

console.log(maxProfit([2, 4, 1])); // 2
console.log(maxProfit([1, 2])); // 1
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
console.log(maxProfit([])); // 0