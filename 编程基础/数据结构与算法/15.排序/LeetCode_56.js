// https://leetcode-cn.com/problems/merge-intervals/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
	if (!intervals || !intervals.length) return [];
	let len = intervals.length,
		i = 0,
		result =[];
	intervals.sort(function (a, b) { return a[0] - b[0]; });
	while (i < len){
		let curLeft = intervals[i][0];
		let curRight = intervals[i][1];
		while(i < len - 1 && intervals[i+1][0] <= curRight){
			curRight = Math.max(intervals[i+1][1], curRight);
			i++;
		}
		result.push([curLeft, curRight]);
		i++;
	}
	return result;
};

console.log(merge([[1, 3], [2, 6], [2, 8], [8, 10], [15, 18]])); // [[1, 10], [15, 18]]
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]])); // [[1, 6], [8, 10], [15, 18]]
console.log(merge([[1, 4], [4, 5]])); // [[1, 5]]