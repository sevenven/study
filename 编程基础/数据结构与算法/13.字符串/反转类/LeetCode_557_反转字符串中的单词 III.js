// https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/
// 给定一个字符串 s ，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

/**
 * @param {string} s
 * @return {string}
 */
// 使用库函数
// 时间复杂度O(n) 空间复杂度O(1)
var reverseWords = function (s) {
	return s
		.split(' ')
		.map(item => item.split('').reverse().join(''))
		.join(' ');
};

/**
 * @param {string} s
 * @return {string}
 */
// 手动翻转1
// 时间复杂度O(n) 空间复杂度O(n)
var reverseWords = function (s) {
	let arr = Array.from(s);
	let L = 0,
		R;
	for (let i = 0; i <= arr.length; i++) {
		if (arr[i] === ' ' || i === s.length) {
			R = i - 1;
			while (L < R) [arr[L++], arr[R--]] = [arr[R], arr[L]];
			L = i + 1;
		}
	}
	return arr.join('');
};

/**
 * @param {string} s
 * @return {string}
 */
// 手动翻转2
// 时间复杂度O(n) 空间复杂度O(n)
var reverseWords = function (s) {
	var str2 = '',
		word = '';
	for (c of s) {
		if (c !== ' ') {
			word = c + word;
		} else {
			str2 += word + c;
			word = '';
		}
	}
	return str2 + word;
};

console.log(reverseWords("Let's take LeetCode contest")); // "s'teL ekat edoCteeL tsetnoc"
console.log(reverseWords('Mr Ding')); // "rM gniD"
