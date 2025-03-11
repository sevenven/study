// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
// 给定一个数组 prices ，其中 prices[i] 是一支给定股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

/**
 * @param {number[]} prices
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var maxProfit = function (prices) {
	if (prices.length <= 1) return 0;
	let totalProfit = 0;
	// 遍历价格数组，寻找所有上涨的区间
	for (let i = 1; i < prices.length; i++) {
		// 如果当天价格比前一天高，就可以获取这个差价的利润
		if (prices[i] > prices[i - 1]) totalProfit += prices[i] - prices[i - 1];
	}

	return totalProfit;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 7
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
console.log(maxProfit([])); // 0
