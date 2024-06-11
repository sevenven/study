// https://leetcode.cn/problems/first-missing-positive
// 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
// 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 哈希表：解法简单易想，空间复杂度不符合题目要求
// 时间复杂度O(n) 空间复杂度O(n)
var firstMissingPositive = function (nums) {
	const exits = {};
	for (num of nums) exits[num] = true;
	for (let i = 1; i <= nums.length; i++) if (!exits[i]) return i;
	return nums.length + 1;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 数组索引作为哈希key
// 时间复杂度O(n) 空间复杂度O(1)
var firstMissingPositive = function (nums) {
	let i = 0,
		p;
	while (i < nums.length) {
		p = nums[i] - 1;
		if (nums[i] >= 1 && nums[i] <= nums.length && nums[i] !== nums[p]) [nums[i], nums[p]] = [nums[p], nums[i]];
		else i++;
	}
	for (let i = 0; i < nums.length; i++) if (nums[i] !== i + 1) return i + 1;
	return nums.length + 1;
};

console.log(firstMissingPositive([1, 2, 0])); // 3
console.log(firstMissingPositive([3, 4, -1, 1])); // 2
console.log(firstMissingPositive([7, 8, 9, 11, 12])); // 1
console.log(firstMissingPositive([1, 2, 3, 4])); // 5
