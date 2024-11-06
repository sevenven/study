// https://leetcode-cn.com/problems/reverse-words-in-a-string/
// 给你一个字符串 s ，请你反转字符串中 单词 的顺序。
// 单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
// 返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。
// 注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。

/**
 * @param {string} s
 * @return {string}
 */
// 使用库函数
var reverseWords = function (s) {
	return s
		.split(' ')
		.filter(s => !!s)
		.reverse()
		.join(' ');
};

/**
 * @param {string} s
 * @return {string}
 */
// 手动反转
var reverseWords = function (s) {
	let arr = Array.from(s),
		L = 0;
	removeEmpty(arr);
	reverse(arr, 0, arr.length - 1);
	for (let i = 0; i <= arr.length; i++) {
		if (arr[i] === ' ' || i === arr.length) {
			reverse(arr, L, i - 1);
			L = i + 1;
		}
	}
	return arr.join('');
};

function removeEmpty(arr) {
	let s = 0;
	for (let f = 0; f < arr.length; f++) {
		if (arr[f] === ' ' && (f === 0 || arr[f - 1] === ' ')) continue;
		arr[s++] = arr[f];
	}
	arr.length = arr[s - 1] === ' ' ? s - 1 : s;
}

function reverse(arr, L, R) {
	while (L < R) [arr[L++], arr[R--]] = [arr[R], arr[L]];
}

console.log(reverseWords('  hello world!  ')); // world! hello
console.log(reverseWords('a good   example')); // example good a
