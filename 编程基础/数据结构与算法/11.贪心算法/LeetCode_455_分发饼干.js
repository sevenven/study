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
// 时间复杂度O(nlogn) 空间复杂度O(1)
var findContentChildren = function (g, s) {
	// 将孩子的胃口值和饼干的尺寸升序排序
	g.sort((a, b) => a - b);
	s.sort((a, b) => a - b);

	let childIndex = 0; // 指向孩子的指针 即满足孩子的数量
	let cookieIndex = 0; // 指向饼干的指针

	// 遍历孩子和饼干
	while (childIndex < g.length && cookieIndex < s.length) {
		if (s[cookieIndex] >= g[childIndex]) childIndex++; // 如果当前饼干可以满足当前孩子
		cookieIndex++; // 无论是否满足，都移动到下一个饼干
	}

	return childIndex;
};

console.log(findContentChildren([1, 2], [1, 2, 3])); // 2
console.log(findContentChildren([10, 9, 8, 7], [5, 6, 7, 8])); // 2
// 测试用例3：没有饼干的情况
console.log(findContentChildren([1, 2, 3], [])); // 输出: 0
// 测试用例4：没有孩子的情况
console.log(findContentChildren([], [1, 2, 3])); // 输出: 0
// 测试用例5：饼干都太小的情况
console.log(findContentChildren([7, 8, 9, 10], [1, 2, 3, 4])); // 输出: 0
