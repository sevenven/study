// https://leetcode.cn/problems/binary-search/description/

// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target
// 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// [left, right]写法
// 时间复杂度O(logn) 空间复杂度O(1)
var search = function (nums, target) {
	let L = 0,
		R = nums.length - 1,
		mid;
	while (L <= R) {
		// 左闭右闭 L==R是合法的
		// 位运算 + 防止大数溢出
		mid = L + ((R - L) >> 1);
		if (nums[mid] < target) L = mid + 1;
		else if (nums[mid] > target) R = mid - 1; // 接下来的搜索区间不需要再包含target 右闭 所以right=mid-1
		else return mid;
	}
	return -1;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// [left, right)写法
// 时间复杂度O(logn) 空间复杂度O(1)
var search = function (nums, target) {
	let L = 0,
		R = nums.length,
		mid;
	while (L < R) {
		mid = L + ((R - L) >> 1);
		if (nums[mid] < target) L = mid + 1;
		else if (nums[mid] > target) R = mid;
		else return mid;
	}
	return -1;
};

console.log(search([-1, 0, 3, 5, 9, 12], 9)); // 4
console.log(search([-1, 0, 3, 5, 9, 12], 2)); // -1
