// https://leetcode-cn.com/problems/merge-intervals/
// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]。
// 请你合并所有重叠的区间，并返回一个不重叠的区间数组。

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 时间复杂度O(nlogn) 空间复杂度O(1)
var merge = function (intervals) {
	if (!intervals || intervals.length <= 1) return intervals; // 处理边界情况：空数组或只有一个区间时直接返回

	intervals.sort((a, b) => a[0] - b[0]); // 按区间起始位置排序，保证能够顺序处理重叠区间

	const result = [intervals[0]]; // 初始化结果数组，放入第一个区间作为起始

	// 遍历剩余区间，尝试合并
	for (let i = 1; i < intervals.length; i++) {
		const current = intervals[i]; // 当前要处理的区间
		const last = result[result.length - 1]; // 结果数组中的最后一个区间

		if (last[1] >= current[0]) {
			// 有重叠，更新上一个区间的终点为两个区间终点的较大值
			last[1] = Math.max(last[1], current[1]);
		} else {
			// 无重叠，将当前区间直接加入结果数组
			result.push(current);
		}
	}

	return result;
};

// 测试用例
const testCases = [
	{
		intervals: [
			[1, 3],
			[2, 6],
			[8, 10],
			[15, 18]
		],
		expected: [
			[1, 6],
			[8, 10],
			[15, 18]
		],
		description: '基本合并场景'
	},
	{
		intervals: [
			[1, 4],
			[4, 5]
		],
		expected: [[1, 5]],
		description: '相邻区间合并'
	},
	{
		intervals: [
			[1, 4],
			[2, 3]
		],
		expected: [[1, 4]],
		description: '完全包含的区间'
	},
	{
		intervals: [[1, 1]],
		expected: [[1, 1]],
		description: '单个区间'
	},
	{
		intervals: [],
		expected: [],
		description: '空数组'
	},
	{
		intervals: [
			[1, 10],
			[2, 3],
			[4, 5],
			[6, 7],
			[8, 9]
		],
		expected: [[1, 10]],
		description: '多个被包含的区间'
	},
	{
		intervals: [
			[2, 3],
			[4, 5],
			[6, 7],
			[8, 9],
			[1, 10]
		],
		expected: [[1, 10]],
		description: '乱序输入的区间'
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = merge(test.intervals);
	const isEqual = JSON.stringify(result) === JSON.stringify(test.expected);

	console.log(`测试用例 ${index + 1}: ${test.description}`);
	console.log('输入:', test.intervals);
	console.log('预期输出:', test.expected);
	console.log('实际输出:', result);
	console.log('测试结果:', isEqual ? '通过' : '失败');
	console.log('------------------------');
});
