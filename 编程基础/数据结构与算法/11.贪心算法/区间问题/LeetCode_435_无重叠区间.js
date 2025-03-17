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

console.log(
	eraseOverlapIntervals([
		[1, 2],
		[2, 3],
		[3, 4],
		[1, 3]
	])
); // 1
console.log(
	eraseOverlapIntervals([
		[1, 2],
		[1, 2],
		[1, 2]
	])
); // 2
console.log(
	eraseOverlapIntervals([
		[1, 2],
		[2, 3]
	])
); // 0
