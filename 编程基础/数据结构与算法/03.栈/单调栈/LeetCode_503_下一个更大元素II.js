// https://leetcode.cn/problems/next-greater-element-ii/
// 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），
// 返回 nums 中每个元素的 下一个更大元素 。
// 数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，
// 这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1 。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
	const n = nums.length;
	const result = new Array(n).fill(-1);
	const stack = [];

	// 遍历两次数组以处理循环情况
	for (let i = 2 * n - 1; i >= 0; i--) {
		while (stack.length && stack[stack.length - 1] <= nums[i % n]) {
			stack.pop();
		}
		result[i % n] = stack.length ? stack[stack.length - 1] : -1;
		stack.push(nums[i % n]);
	}

	return result;
};

console.log(nextGreaterElements([1, 2, 1])); // [2,-1,2]
console.log(nextGreaterElements([1, 2, 3, 4, 3])); // [2,3,4,-1,4]
