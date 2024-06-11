// https://leetcode-cn.com/problems/plus-one/
// 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
// 最高位数字存放在数组的首位，数组中每个元素只存储单个数字。
// 你可以假设除了整数0之外，这个整数不会以零开头。

/**
 * @param {number[]} digits
 * @return {number[]}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var plusOne = function (digits) {
	for (let i = digits.length - 1; i >= 0; i--) {
		digits[i]++;
		if (digits[i] !== 10) {
			return digits;
		} else {
			digits[i] = 0;
		}
	}
	digits.unshift(1);
	return digits;
};

console.log(plusOne([1, 2, 3])); // [1, 2, 4]
console.log(plusOne([9, 8, 9])); // [9, 9, 0]
console.log(plusOne([9, 9, 9])); // [1, 0, 0, 0]
console.log(plusOne([9])); // [1, 0]
