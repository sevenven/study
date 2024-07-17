// https://leetcode-cn.com/problems/search-in-rotated-sorted-array/

// 整数数组 nums 按升序排列，数组中的值 互不相同 。
// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转
// 使数组变为 [nums[k], nums[k + 1], ..., nums[n - 1], nums[0], nums[1], ..., nums[k - 1]]（下标 从 0 开始 计数）。
// 例如 [0, 1, 2, 4, 5, 6, 7, 8] 在下标 3 处经旋转后可能变为 [4, 5, 6, 7, 8, 0, 1, 2] 。
// 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
// 你必须设计一个时间复杂度为 O(logn) 的算法解决此问题。

// 是否有序 目标值时候否在有序区间范围内

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
	let L = 0,
		R = nums.length - 1,
		mid;
	while (L <= R) {
		mid = L + ((R - L) >> 1);
		if (nums[mid] === target) return mid;
		if (nums[L] <= nums[mid]) {
			// 左边有序
			if (nums[L] <= target && nums[mid] > target) R = mid - 1; // 目标值在有序区间内
			else L = mid + 1; // 目标值在无序区间内
		} else {
			// 右边有序
			if (nums[R] >= target && nums[mid] < target) L = mid + 1; // 目标值在有序区间内
			else R = mid - 1; // 目标值在无序区间内
		}
	}
	return -1;
};

console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1
