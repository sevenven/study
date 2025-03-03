// https://leetcode-cn.com/problems/assign-cookies/

/**
 * @param {number[]} g - 孩子的胃口值数组
 * @param {number[]} s - 饼干的尺寸数组
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var findContentChildren = function (g, s) {
	// 将孩子的胃口值和饼干的尺寸排序
	g.sort((a, b) => a - b);
	s.sort((a, b) => a - b);

	let childIndex = 0; // 指向孩子的指针
	let cookieIndex = 0; // 指向饼干的指针
	let satisfied = 0; // 满足的孩子数量

	// 遍历孩子和饼干
	while (childIndex < g.length && cookieIndex < s.length) {
		// 如果当前饼干可以满足当前孩子
		if (s[cookieIndex] >= g[childIndex]) {
			satisfied++; // 满足一个孩子
			childIndex++; // 移动到下一个孩子
		}
		cookieIndex++; // 无论是否满足，都移动到下一个饼干
	}

	return satisfied;
};

console.log(findContentChildren([1, 2], [1, 2, 3])); // 2
console.log(findContentChildren([10, 9, 8, 7], [5, 6, 7, 8])); // 2
