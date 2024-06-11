// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/

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
		while (i < len && prices[i] >= prices[i+1]) 
			i++;
		valley = prices[i];
		while(i < len && prices[i] <= prices[i+1])
			i++;
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
		if (prices[i] < prices[i+1]) 
			maxprofit += prices[i+1] - prices[i];
	}
	return maxprofit;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 7
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
console.log(maxProfit([])); // 0