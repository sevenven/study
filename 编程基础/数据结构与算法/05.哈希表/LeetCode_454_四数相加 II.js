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
	for (let i = 0; i < nums1.length; i++) {
		for (let j = 0; j < nums2.length; j++) {
			for (let k = 0; k < nums3.length; k++) {
				for (let l = 0; l < nums4.length; l++) {
					if (nums1[i] + nums2[j] + nums3[k] + nums4[l] === 0) count++;
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
	let map = new Map(),
		count = 0,
		sum,
		another;
	for (let i = 0; i < nums1.length; i++) {
		for (let j = 0; j < nums2.length; j++) {
			sum = nums1[i] + nums2[j];
			map.set(sum, (map.get(sum) || 0) + 1);
		}
	}
	for (let k = 0; k < nums3.length; k++) {
		for (let l = 0; l < nums4.length; l++) {
			another = 0 - nums3[k] - nums4[l];
			if (map.get(another)) count += map.get(another);
		}
	}
	return count;
};

console.log(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]));
