// https://leetcode-cn.com/problems/length-of-last-word/

// 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。
// 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。

/**
 * @param {string} s
 * @return {number}
 */
// 使用库函数
var lengthOfLastWord = function (s) {
	const arr = s.split(' ').filter(s => !!s);
	return arr.length ? arr[arr.length - 1].length : 0;
};

/**
 * @param {string} s
 * @return {number}
 */
// 手动计算
var lengthOfLastWord = function (s) {
	let count = 0,
		i = s.length - 1;
	while (s[i] === ' ') i--;
	while (i >= 0) {
		if (s[i--] !== ' ') count++;
		else break;
	}
	return count;
};

console.log(lengthOfLastWord('')); // 0
console.log(lengthOfLastWord('Hello World')); // 5
console.log(lengthOfLastWord('   fly me   to   the moon  ')); // 4
console.log(lengthOfLastWord('luffy is still joyboy')); // 6
