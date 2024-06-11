// https://leetcode.cn/problems/intersection-of-two-arrays/description/
// 给定两个数组 nums1 和 nums2 ，返回 它们的 交集
// 输出结果中的每个元素一定是 唯一 的 我们可以， 不考虑输出结果的顺序

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// 时间复杂度O(n) 空间复杂度O(n)
var intersection = function (nums1, nums2) {
	let exits = new Set(),
		result = new Set();
	for (let i = 0; i < nums1.length; i++) exits.add(nums1[i]);
	for (let i = 0; i < nums2.length; i++) {
		if (exits.has(nums2[i])) result.add(nums2);
	}
	return Array.from(result);
};

console.log(intersection([1, 2, 2, 1], [2, 2]));
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4]));
