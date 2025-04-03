// https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/
// 有一些球形气球贴在一堵用 XY 平面表示的墙面上。墙面上的气球记录在整数数组 points ，
// 其中points[i] = [xstart, xend] 表示水平直径在 xstart 和 xend之间的气球。
// 你需要射出尽可能少的箭，使得所有气球都被引爆。每支箭可以在任何地方沿着 x 轴射出。
// 一支箭可以引爆任意高度的气球。箭从 x 轴上射出时，可以向上或向下射击。
// 返回引爆所有气球所需要的最小箭数。

/**
 * @param {number[][]} points
 * @return {number}
 */
// 时间复杂度O(nlogn) 空间复杂度O(1)
var findMinArrowShots = function (points) {
	if (points.length === 0) return 0;

	// 按照气球右边界升序排序
	points.sort((a, b) => a[1] - b[1]);

	let arrows = 1; // 至少需要一支箭
	let lastEnd = points[0][1]; // 记录上一个气球的右边界

	for (let i = 1; i < points.length; i++) {
		// 如果当前气球的左边界大于上一个气球的右边界 说明需要新增一支箭
		if (points[i][0] > lastEnd) {
			arrows++;
			lastEnd = points[i][1];
		}
	}

	return arrows;
};

// 测试用例
const testCases = [
	{
		// 基本场景：有重叠的气球
		points: [
			[10, 16],
			[2, 8],
			[1, 6],
			[7, 12]
		],
		expected: 2,
		description: '气球有重叠，可以用2支箭引爆所有气球'
	},
	{
		// 完全不重叠的气球
		points: [
			[1, 2],
			[3, 4],
			[5, 6],
			[7, 8]
		],
		expected: 4,
		description: '气球完全不重叠，每个气球需要一支箭'
	},
	{
		// 相邻气球刚好接触
		points: [
			[1, 2],
			[2, 3],
			[3, 4],
			[4, 5]
		],
		expected: 2,
		description: '相邻气球刚好接触，可以两支箭引爆'
	},
	{
		// 完全重叠的气球
		points: [
			[1, 5],
			[2, 5],
			[3, 5],
			[4, 5]
		],
		expected: 1,
		description: '所有气球都有公共区域，一支箭就够了'
	},
	{
		// 空数组测试
		points: [],
		expected: 0,
		description: '空数组应该返回0'
	},
	{
		// 单个气球测试
		points: [[1, 2]],
		expected: 1,
		description: '单个气球需要一支箭'
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = findMinArrowShots(test.points);
	console.log(`测试用例 ${index + 1}: ${test.description}`);
	console.log('输入:', test.points);
	console.log('预期输出:', test.expected);
	console.log('实际输出:', result);
	console.log('测试结果:', result === test.expected ? '通过' : '失败');
	console.log('------------------------');
});
