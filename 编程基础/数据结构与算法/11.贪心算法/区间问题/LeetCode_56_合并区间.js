// https://leetcode-cn.com/problems/merge-intervals/
// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]。
// 请你合并所有重叠的区间，并返回一个不重叠的区间数组。

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 时间复杂度O(nlogn) 空间复杂度O(1)
var merge = function (intervals) {};

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
