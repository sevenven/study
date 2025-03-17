// https://leetcode-cn.com/problems/partition-labels/
// 给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。
// 注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s 。
// 返回一个表示每个字符串片段的长度的列表。

/**
 * @param {string} s
 * @return {number[]}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var partitionLabels = function (s) {
	// 记录每个字符最后出现的位置
	const lastPos = new Array(26).fill(0);
	for (let i = 0; i < s.length; i++) {
		lastPos[s.charCodeAt(i) - 'a'.charCodeAt(0)] = i;
	}

	const result = [];
	let start = 0; // 当前片段的起始位置
	let end = 0; // 当前片段的结束位置

	for (let i = 0; i < s.length; i++) {
		// 更新当前片段的结束位置
		end = Math.max(end, lastPos[s.charCodeAt(i) - 'a'.charCodeAt(0)]);

		// 如果已经到达当前片段的结束位置
		if (i === end) {
			result.push(end - start + 1); // 添加当前片段的长度
			start = i + 1; // 更新下一个片段的起始位置
		}
	}

	return result;
};

console.log(partitionLabels('ababcbacadefegdehijhklij')); // [9,7,8]
console.log(partitionLabels('eccbbbbdec')); // [10]
