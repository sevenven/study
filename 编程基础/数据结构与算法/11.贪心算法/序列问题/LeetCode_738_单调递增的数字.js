// https://leetcode.cn/problems/monotone-increasing-digits/
// 当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。
// 给定一个整数 n ，返回 小于或等于 n 的最大数字，且数字呈 单调递增 。

/**
 * @param {number} n
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(n)
var monotoneIncreasingDigits = function (n) {
	if (n < 10) return n;

	const digits = String(n).split('').map(Number);
	let changeIndex = digits.length;

	// 从右向左遍历，找到需要调整的位置
	for (let i = digits.length - 1; i > 0; i--) {
		if (digits[i - 1] > digits[i]) {
			digits[i - 1]--;
			changeIndex = i;
		}
	}

	// 填充9
	for (let i = changeIndex; i < digits.length; i++) {
		digits[i] = 9;
	}

	return parseInt(digits.join(''), 10);
};

// 测试用例
const testCases = [
	{
		input: 10,
		expected: 9,
		description: '基本情况：需要将左边数字减1'
	},
	{
		input: 1234,
		expected: 1234,
		description: '已经是单调递增的数字'
	},
	{
		input: 332,
		expected: 299,
		description: '需要处理多位数字的情况'
	},
	{
		input: 100,
		expected: 99,
		description: '包含0的情况'
	},
	{
		input: 668841,
		expected: 666999,
		description: '复杂情况：需要多次调整'
	},
	{
		input: 1000,
		expected: 999,
		description: '连续的0需要全部变为9'
	},
	{
		input: 9,
		expected: 9,
		description: '单个数字的边界情况'
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = monotoneIncreasingDigits(test.input);
	console.log(`测试用例 ${index + 1}: ${test.description}`);
	console.log('输入:', test.input);
	console.log('预期输出:', test.expected);
	console.log('实际输出:', result);
	console.log('测试结果:', result === test.expected ? '通过' : '失败');
	console.log('------------------------');
});
