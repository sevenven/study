// https://leetcode.cn/problems/candy/description/
// n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
// 你需要按照以下要求，给这些孩子分发糖果：
// 1. 每个孩子至少分配到 1 个糖果。
// 2. 相邻两个孩子评分更高的孩子会获得更多的糖果。
// 请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。

/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
	const n = ratings.length;
	const candies = new Array(n).fill(1); // 初始每人分配1个糖果

	// 从左向右遍历，保证右边评分高的孩子比左边的糖果多
	for (let i = 1; i < n; i++) {
		if (ratings[i] > ratings[i - 1]) {
			candies[i] = candies[i - 1] + 1;
		}
	}

	// 从右向左遍历，保证左边评分高的孩子比右边的糖果多
	for (let i = n - 2; i >= 0; i--) {
		if (ratings[i] > ratings[i + 1]) {
			candies[i] = Math.max(candies[i], candies[i + 1] + 1);
		}
	}

	// 计算总糖果数
	return candies.reduce((sum, num) => sum + num, 0);
};
