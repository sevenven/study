// https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/
// 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。
// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
	if (nums.length < 2) return 2;
	let p = 2;
	for (let i = 2; i < nums.length; i++) {
		if (nums[i] === nums[p - 1] && nums[i] === nums[p - 2]) continue;
		nums[p++] = nums[i];
	}
	return p;
};

console.log(removeDuplicates((nums = [1, 1, 1, 2, 2, 3])), nums);
