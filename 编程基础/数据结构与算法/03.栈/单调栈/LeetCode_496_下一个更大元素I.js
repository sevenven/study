// https://leetcode.cn/problems/next-greater-element-i/
// nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。
// 给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。
// 对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，
// 并且在 nums2 确定 nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
	const map = new Map();
	const stack = [];

	// 使用单调栈处理nums2
	for (let i = nums2.length - 1; i >= 0; i--) {
		while (stack.length && stack[stack.length - 1] <= nums2[i]) {
			stack.pop();
		}
		map.set(nums2[i], stack.length ? stack[stack.length - 1] : -1);
		stack.push(nums2[i]);
	}

	// 根据map查询nums1中每个元素的下一个更大元素
	return nums1.map(x => map.get(x));
};

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); // [-1,3,-1]
console.log(nextGreaterElement([2, 4], [1, 2, 3, 4])); // [3,-1]
