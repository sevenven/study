// https://leetcode-cn.com/problems/partition-labels/
// 给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。
// 注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s 。
// 返回一个表示每个字符串片段的长度的列表。

/**
 * @param {string} s
 * @return {number[]}
 */
/**
 * @param {string} s 输入字符串
 * @return {number[]} 返回每个片段的长度数组
 */
// 时间复杂度O(n) 空间复杂度O(1)
var partitionLabels = function (s) {
	// 记录每个字符最后出现的位置
	const lastPos = {};
	for (let i = 0; i < s.length; i++) lastPos[s[i]] = i;

	const result = [];
	let start = 0; // 当前片段的起始位置
	let end = 0; // 当前片段的结束位置（初始为0）

	for (let i = 0; i < s.length; i++) {
		// 更新当前片段的结束位置 取当前end和当前字符最后出现位置的较大值
		end = Math.max(end, lastPos[s[i]]);

		// 如果当前位置达到了片段的结束位置 说明找到了一个满足条件的片段
		if (i === end) {
			// 计算片段长度并添加到结果数组
			result.push(end - start + 1);
			// 更新下一个片段的起始位置
			start = i + 1;
		}
	}

	return result;
};

// 测试用例
const testCases = [
	{
		input: 'ababcbacadefegdehijhklij',
		expected: [9, 7, 8],
		description: '包含多个重复字符的复杂字符串'
	},
	{
		input: 'eccbbbbdec',
		expected: [10],
		description: '所有字符都需要在同一片段中'
	},
	{
		input: 'abc',
		expected: [1, 1, 1],
		description: '每个字符都可以独立成片段'
	},
	{
		input: 'aaa',
		expected: [3],
		description: '相同字符组成的字符串'
	},
	{
		input: 'abcade',
		expected: [6],
		description: "由于'a'的位置，所有字符需要在一起"
	},
	{
		input: 'vhaagbqkaqtctq',
		expected: [1, 1, 8, 4],
		description: '复杂的分割情况'
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = partitionLabels(test.input);
	const isEqual = JSON.stringify(result) === JSON.stringify(test.expected);

	console.log(`测试用例 ${index + 1}: ${test.description}`);
	console.log('输入:', test.input);
	console.log('预期输出:', test.expected);
	console.log('实际输出:', result);
	console.log('测试结果:', isEqual ? '通过' : '失败');
	console.log('------------------------');
});
