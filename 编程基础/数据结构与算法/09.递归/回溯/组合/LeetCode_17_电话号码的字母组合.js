// https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/

// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

/**
 * @param {string} digits
 * @return {string[]}
 */
// 回溯
var letterCombinations = function (
	digits,
	curIndex = 0,
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
	path = '',
	result = []
) {
	if (curIndex === digits.length && path) {
		result.push(path);
		return;
	}
	for (c of map[digits[curIndex]] || '') letterCombinations(digits, curIndex + 1, map, path + c, result);
	return result;
};

console.log(letterCombinations('234'));
