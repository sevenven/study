// https://leetcode-cn.com/problems/merge-intervals/
// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]。
// 请你合并所有重叠的区间，并返回一个不重叠的区间数组。

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 时间复杂度O(nlogn) 空间复杂度O(1)
var merge = function (intervals) {
	// 按区间起始位置排序
	intervals.sort((a, b) => a[0] - b[0]);

	const result = [];
	let current = intervals[0];

	for (let i = 1; i < intervals.length; i++) {
		if (current[1] >= intervals[i][0]) {
			// 有重叠 合并区间
			current[1] = Math.max(current[1], intervals[i][1]);
		} else {
			// 无重叠
			result.push(current); // 将当前区间加入结果
			current = intervals[i]; // 更新当前区间
		}
	}

	result.push(current); // 加入最后一个区间
	return result;
};

console.log(
	merge([
		[1, 3],
		[2, 6],
		[8, 10],
		[15, 18]
	])
); // [[1,6],[8,10],[15,18]]
console.log(
	merge([
		[1, 4],
		[4, 5]
	])
); // [[1,5]]
