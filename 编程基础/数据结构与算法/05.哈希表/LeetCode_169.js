// https://leetcode-cn.com/problems/majority-element/
// 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 暴力法
// 时间复杂度O(n^2) 空间复杂度O(1)
var majorityElement = function (nums) {
	let majorityCount = nums.length >> 1,
		count = 0;
	for (let i = 0; i < nums.length; i++) {
		count = 0;
		for (let j = 0; j < nums.length; j++) {
			if (nums[i] === nums[j]) {
				count++;
			}
		}
		if (count > majorityCount) return nums[i];
	}
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 哈希表
// 时间复杂度O(n) 空间复杂度O(n)
var majorityElement = function (nums) {
	const count = {},
		majority = nums.length >> 1;
	for (let num of nums) count[num] = count[num] ? ++count[num] : 1;
	for (key in count) {
		if (count[key] > majority) return key * 1;
	}
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 排序
// 时间复杂度O(nlogn) 空间复杂度O(1)
var majorityElement = function (nums) {
	nums.sort((a, b) => a - b);
	return nums[nums.length >> 1];
};

console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
console.log(majorityElement([1, 2, 1, 1, 1, 2, 2])); // 1
