// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
// 给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。
// 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
// 返回获得利润的最大值。
// 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
	let buy = prices[0] + fee; // 记录买入价格（包含手续费）
	let profit = 0; // 记录总利润

	for (let i = 1; i < prices.length; i++) {
		// 如果当前价格+手续费小于之前的买入价格，更新买入价格
		if (prices[i] + fee < buy) {
			buy = prices[i] + fee;
		}
		// 如果当前价格大于买入价格，计算利润
		else if (prices[i] > buy) {
			profit += prices[i] - buy;
			buy = prices[i]; // 更新买入价格为当前价格，为了处理连续上涨的情况
		}
	}

	return profit;
};

console.log(maxProfit([1, 3, 2, 8, 4, 9], 2)); // 输出: 8
console.log(maxProfit([1, 3, 7, 5, 10, 3], 3)); // 输出: 6
