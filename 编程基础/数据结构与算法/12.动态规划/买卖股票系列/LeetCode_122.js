// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/

/**
 * @param {number[]} prices
 * @return {number}
 */
// 贪心算法
// 时间复杂度O(n) 空间复杂度O(1)
var maxProfit = function (prices) {
	var len = prices.length,
		maxprofit = 0;
	for (var i = 1; i < len; i++) {
		if (prices[i] > prices[i - 1]) maxprofit += prices[i] - prices[i - 1];
	}
	return maxprofit;
};

// dp方程：
// dp状态记录当天手上有股票或者没有股票的状态,会叠加上一次的计算结果
// dp[i][1] = max{dp[i-1][1], dp[i-1][0] - p[i]} //当天有股票
// dp[i][0] = max{dp[i-1][0], dp[i-1][1] + p[i]} // 当天没有股票

/**
 * @param {number[]} prices
 * @return {number}
 */
// 写法一
// 时间复杂度O(n) 空间复杂度O(n)
var maxProfit = function (prices) {
	var len = prices.length,
		dp = [[0, -prices[0]]];
	for (var i = 1; i < len; i++) {
		dp[i] = [];
		dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
		dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
	}
	return dp[dp.length - 1][0];
};

// 写法二
// 时间复杂度O(n) 空间复杂度O(1)
var maxProfit = function (prices) {
	var dp0 = 0,
		dp1 = -Number.MAX_SAFE_INTEGER;
	for (price of prices) {
		var temp = dp1;
		dp1 = Math.max(dp1, dp0 - price);
		dp0 = Math.max(dp0, temp + price);
	}
	return dp0;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 7
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
console.log(maxProfit([1])); // 0
console.log(maxProfit([])); // 0
