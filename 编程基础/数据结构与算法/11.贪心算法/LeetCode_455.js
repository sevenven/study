// https://leetcode-cn.com/problems/assign-cookies/

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var findContentChildren = function (g, s) {
	var gi = 0,
		si = 0;
	g.sort(function (a, b) { return a - b });
	s.sort(function (a, b) { return a - b });
	while (gi < g.length && si < s.length) {
		if (g[gi] <= s[si]) gi++;
		si++;
	}
	return gi;
};

console.log(findContentChildren([1, 2], [1, 2, 3])); // 2
console.log(findContentChildren([10, 9, 8, 7], [5, 6, 7, 8])); // 2