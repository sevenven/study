// https://leetcode-cn.com/problems/assign-cookies/
// 假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。
// 对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；
// 并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。
// 你的目标是满足尽可能多的孩子，并输出这个最大数值。

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
