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

// 测试用例
const testCases = [
	{
		ratings: [1, 0, 2],
		expected: 5, // 分配方案：[2,1,2]
		description: '三个孩子，中间评分最低'
	},
	{
		ratings: [1, 2, 2],
		expected: 4, // 分配方案：[1,2,1]
		description: '三个孩子，后两个评分相同'
	},
	{
		ratings: [1, 3, 2, 2, 1],
		expected: 7, // 分配方案：[1,3,2,1,1]
		description: '五个孩子，有相同评分'
	},
	{
		ratings: [1, 2, 87, 87, 87, 2, 1],
		expected: 13, // 分配方案：[1,2,3,3,3,2,1]
		description: '中间有连续相同的高分'
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = candy(test.ratings);
	console.log(`测试用例 ${index + 1}: ${test.description}`);
	console.log(`输入: ratings = [${test.ratings}]`);
	console.log(`预期输出: ${test.expected}`);
	console.log(`实际输出: ${result}`);
	console.log(`结果: ${result === test.expected ? '通过' : '失败'}`);
	console.log('------------------------');
});
