// https://leetcode.cn/problems/4sum-ii/description/
// 给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：
// 0 <= i, j, k, l < n & nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
// 暴力
// 时间复杂度O(n^4) 空间复杂度O(1)
var fourSumCount = function (nums1, nums2, nums3, nums4) {
	let count = 0;
	for (n1 of nums1) {
		for (n2 of nums2) {
			for (n3 of nums3) {
				for (n4 of nums4) {
					if (n1 + n2 + n3 + n4 === 0) count++;
				}
			}
		}
	}
	return count;
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
// 使用Map转换成两数之和等于0
// 时间复杂度O(n^2) 空间复杂度O(1)
var fourSumCount = function (nums1, nums2, nums3, nums4) {
	let count = 0,
		map = new Map();
	for (n1 of nums1) {
		for (n2 of nums2) map.set(n1 + n2, (map.get(n1 + n2) || 0) + 1);
	}
	for (n3 of nums3) {
		for (n4 of nums4) if (map.get(0 - n3 - n4)) count++;
	}
	return count;
};

console.log(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]));
