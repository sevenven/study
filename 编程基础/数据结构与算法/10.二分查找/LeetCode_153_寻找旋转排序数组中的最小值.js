// https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/

// 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0, 1, 2, 4, 5, 6, 7] 在变化后可能得到：
// 若旋转 4 次，则可以得到 [4, 5, 6, 7, 0, 1, 2]
// 若旋转 7 次，则可以得到 [0, 1, 2, 4, 5, 6, 7]
// 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。
// 给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
// 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

/**
 * @param {number[]} nums
 * @return {number}
 */
// [left, right) 解法
// 时间复杂度O(logn) 空间复杂度O(1)
var findMin = function (nums) {
	let L = 0,
		R = nums.length - 1,
		mid;
	while (L < R) {
		mid = L + ((R - L) >> 1);
		if (nums[mid] > nums[R]) L = mid + 1;
		else R = mid;
	}
	return nums[L];
};

console.log(findMin([3, 4, 5, 1, 2])); // 1
console.log(findMin([2, 3, 4, 5, 1])); // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
console.log(findMin([4, 5, 6, 7, 8, 9, 0, 1, 2])); // 0
