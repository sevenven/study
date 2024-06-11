// https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/

/**
 * @param {number[]} nums
 * @return {number}
 */
// 时间复杂度O(logn) 空间复杂度O(1)
var findMin = function (nums) {
	var left = 0,
		right = nums.length - 1;
	while (left < right) {
		var mid = (left + right) >> 1;
		if (nums[mid] > nums[right]) left = mid + 1;
		else right = mid;
	}
	return nums[left];
};

console.log(findMin([3, 4, 5, 1, 2]));
console.log(findMin([4, 5, 6, 7, 0, 1, 2]));
console.log(findMin([4, 5, 6, 7, 8, 9, 0, 1, 2]));
