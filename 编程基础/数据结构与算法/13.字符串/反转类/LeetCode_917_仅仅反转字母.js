// https://leetcode-cn.com/problems/reverse-only-letters/

// 给你一个字符串 s ，根据下述规则反转字符串：
// 所有非英文字母保留在原有位置。
// 所有英文字母（小写或大写）位置反转。
// 返回反转后的 s 。

/**
 * @param {string} S
 * @return {string}
 */
// 时间复杂度O(n) 空间复杂度O(n)
var reverseOnlyLetters = function (s) {
	let arr = s.split(''),
		L = 0,
		R = arr.length - 1;
	while (L < R) {
		while (L < R && !isLetter(arr[L])) L++;
		while (L < R && !isLetter(arr[R])) R--;
		[arr[L++], arr[R--]] = [arr[R], arr[L]];
	}
	return arr.join('');
};

function isLetter(s) {
	const code = s.charCodeAt();
	return (code >= 97 && code <= 122) || (code >= 65 && code <= 90);
}

console.log(reverseOnlyLetters('a-bC-dEf-ghIj'));
console.log(reverseOnlyLetters('Test1ng-Leet=code-Q!'));
