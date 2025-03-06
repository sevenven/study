// https://leetcode-cn.com/problems/non-overlapping-intervals/
// 给定一个区间的集合 intervals，其中 intervals[i] = [starti, endi]。
// 返回需要移除的区间的最小数量，使剩余区间互不重叠。

/**
 * @param {number[][]} intervals
 * @return {number}
 */
// 时间复杂度O(nlogn) 空间复杂度O(1)
var eraseOverlapIntervals = function (intervals) {};

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
