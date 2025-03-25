// https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations/
// 给你一个整数数组 nums 和一个整数 k ，按以下方法修改该数组：
// 选择某个下标 i 并将 nums[i] 替换为 -nums[i] 。
// 重复这个过程恰好 k 次。可以多次选择同一个下标 i 。
// 以这种方式修改数组后，返回数组 可能的最大和 。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 时间复杂度O(nlogn) 空间复杂度O(1)
var largestSumAfterKNegations = function (nums, k) {
	// 按照绝对值从大到小排序
	nums.sort((a, b) => Math.abs(b) - Math.abs(a));
	// 从绝对值最大的负数开始取反
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] < 0 && k > 0) {
			nums[i] = -nums[i];
			k--;
		}
	}
	// 如果k还有剩余且为奇数，取反绝对值最小的数
	if (k % 2 === 1) nums[nums.length - 1] = -nums[nums.length - 1];
	// 计算数组和
	return nums.reduce((sum, num) => sum + num, 0);
};

// 测试用例
const testCases = [
	{
		nums: [4, 2, 3],
		k: 1,
		expected: 5 // [4,-2,3]
	},
	{
		nums: [3, -1, 0, 2],
		k: 3,
		expected: 6 // [3,1,0,2]
	},
	{
		nums: [2, -3, -1, 5, -4],
		k: 2,
		expected: 13 // [2,3,1,5,4]
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = largestSumAfterKNegations(test.nums.slice(), test.k);
	console.log(`测试用例 ${index + 1}:`);
	console.log(`输入: nums = [${test.nums}], k = ${test.k}`);
	console.log(`预期输出: ${test.expected}`);
	console.log(`实际输出: ${result}`);
	console.log(`结果: ${result === test.expected ? '通过' : '失败'}`);
	console.log('------------------------');
});
