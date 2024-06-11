// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
// 给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。
// 考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：
// 更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要。
// 返回 k 。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 快慢指针法-快慢指针相等，只移动快指针|快慢指针不相等，慢指针自增并赋值给快指针，快指针自增
// 时间复杂度O(n) 空间复杂度O(1)
var removeDuplicates = function (nums) {
	let p = 0;
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] === nums[p]) continue;
		nums[++p] = nums[i];
	}
	return p + 1;
};

const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(nums), nums); // 5
