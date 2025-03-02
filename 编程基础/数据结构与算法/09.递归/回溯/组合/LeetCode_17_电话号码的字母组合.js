// https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

/**
 * 生成数字对应的所有字母组合
 * @param {string} digits - 输入的数字字符串
 * @param {number} curIndex - 当前处理的数字索引
 * @param {object} map - 数字到字母的映射表
 * @param {string} path - 当前生成的字母组合
 * @param {string[]} result - 存储所有字母组合的结果数组
 * @returns {string[]} - 返回所有字母组合
 */
// 隐藏回溯写法
var letterCombinations = function (
	digits,
	map = {
		2: 'abc',
		3: 'def',
		4: 'ghi',
		5: 'jkl',
		6: 'mno',
		7: 'pqrs',
		8: 'tuv',
		9: 'wxyz'
	},
	curIndex = 0,
	path = '',
	result = []
) {
	// 如果已经处理完所有数字
	if (curIndex === digits.length) {
		if (path) result.push(path); // 并且当前组合不为空，则将其加入结果数组
		return result;
	}
	// 遍历当前数字对应的每个字母，递归生成组合
	for (let c of map[digits[curIndex]] || '') {
		// curIndex&path: 隐藏回溯
		letterCombinations(digits, map, curIndex + 1, path + c, result);
	}
	return result;
};

console.log(letterCombinations('234'));
