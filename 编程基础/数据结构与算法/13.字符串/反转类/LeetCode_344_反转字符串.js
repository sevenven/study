// https://leetcode-cn.com/problems/reverse-string/

// 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
// 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
// 双指针法
// 时间复杂度O(n) 空间复杂度O(1)
var reverseString = function (s) {
	let L = 0,
		R = s.length - 1;
	while (L < R) [s[L++], s[R--]] = [s[R], s[L]];
};

reverseString((s = ['h', 'e', 'l', 'l', 'o'])); // [ 'o', 'l', 'l', 'e', 'h' ]
console.log(s);
