// https://leetcode-cn.com/problems/non-overlapping-intervals/
// 给定一个区间的集合 intervals，其中 intervals[i] = [starti, endi]。
// 返回需要移除的区间的最小数量，使剩余区间互不重叠。

/**
 * @param {number[][]} intervals
 * @return {number}
 */
// 时间复杂度O(nlogn) 空间复杂度O(1)
var eraseOverlapIntervals = function (intervals) {
	if (intervals.length === 0) return 0;

	// 按照区间结束时间升序排序
	intervals.sort((a, b) => a[1] - b[1]);

	let count = 0; // 需要移除的区间数量
	let lastEnd = intervals[0][1]; // 记录上一个区间的结束时间

	for (let i = 1; i < intervals.length; i++) {
		if (intervals[i][0] < lastEnd) {
			// 当前区间与上一个区间重叠
			count++; // 移除当前区间
		} else {
			// 不重叠，更新lastEnd
			lastEnd = intervals[i][1];
		}
	}

	return count;
};

// 测试用例
const testCases = [
	{
		intervals: [
			[1, 2],
			[2, 3],
			[3, 4],
			[1, 3]
		],
		expected: 1,
		description: '移除[1,3]后，其他区间互不重叠'
	},
	{
		intervals: [
			[1, 2],
			[1, 2],
			[1, 2]
		],
		expected: 2,
		description: '三个相同区间，需要移除两个'
	},
	{
		intervals: [
			[1, 4],
			[2, 3],
			[3, 6],
			[1, 3]
		],
		expected: 2,
		description: '复杂重叠情况，需要移除两个区间'
	},
	{
		intervals: [
			[1, 2],
			[3, 4],
			[5, 6]
		],
		expected: 0,
		description: '已经互不重叠，不需要移除'
	},
	{
		intervals: [],
		expected: 0,
		description: '空数组边界情况'
	},
	{
		intervals: [
			[1, 100],
			[11, 22],
			[1, 11],
			[2, 12]
		],
		expected: 2,
		description: '包含大区间的情况'
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = eraseOverlapIntervals(test.intervals);
	console.log(`测试用例 ${index + 1}: ${test.description}`);
	console.log('输入:', test.intervals);
	console.log('预期输出:', test.expected);
	console.log('实际输出:', result);
	console.log('测试结果:', result === test.expected ? '通过' : '失败');
	console.log('------------------------');
});
