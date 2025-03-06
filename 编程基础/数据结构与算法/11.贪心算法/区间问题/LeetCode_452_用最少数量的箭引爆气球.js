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
var findMinArrowShots = function (points) {};

console.log(
	findMinArrowShots([
		[10, 16],
		[2, 8],
		[1, 6],
		[7, 12]
	])
); // 2
console.log(
	findMinArrowShots([
		[1, 2],
		[3, 4],
		[5, 6],
		[7, 8]
	])
); // 4
console.log(
	findMinArrowShots([
		[1, 2],
		[2, 3],
		[3, 4],
		[4, 5]
	])
); // 2
