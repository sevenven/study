// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
// 给定一个数组 prices ，其中 prices[i] 是一支给定股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

/**
 * @param {number[]} prices
 * @return {number}
 */
// 方法一
// 时间复杂度O(n) 空间复杂度O(1)
var maxProfit = function (prices) {
	var len = prices.length - 1,
		valley = prices[0],
		peak = prices[0],
		maxprofit = 0;
	for (var i = 0; i < len; i++) {
		while (i < len && prices[i] >= prices[i + 1]) i++;
		valley = prices[i];
		while (i < len && prices[i] <= prices[i + 1]) i++;
		peak = prices[i];
		maxprofit += peak - valley;
	}
	return maxprofit;
};

// 方法二(贪心)
// 时间复杂度O(n) 空间复杂度O(1)
var maxProfit = function (prices) {
	var len = prices.length - 1,
		maxprofit = 0;
	for (var i = 0; i < len; i++) {
		if (prices[i] < prices[i + 1]) maxprofit += prices[i + 1] - prices[i];
	}
	return maxprofit;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 7
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
console.log(maxProfit([])); // 0
