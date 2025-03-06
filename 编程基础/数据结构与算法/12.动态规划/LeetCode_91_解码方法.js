// https://leetcode-cn.com/problems/decode-ways/

// dp方程
// 看自身：dp[i] = s[i] == 0 ? 0 : dp[i-1];
// 看前一位：s[i-1] == 1 || s[i-1] == 2 && s[i] < 7 -> dp[i] += dp[i-2];

/**
 * @param {string} s
 * @return {number}
 */
// 第一种写法(较难理解)
// 时间复杂度O(n) 空间复杂度O(n)
var numDecodings = function (s) {
	if (!s || !s.length || s[0] === '0') return 0;
	var len = s.length,
		dp = new Array(len + 1).fill(0);
	dp[0] = dp[1] = 1;
	for (var i = 2; i <= len; i++) {
		if (s[i - 1] != 0) dp[i] += dp[i - 1];
		if (s[i - 2] == 1 || (s[i - 2] == 2 && s[i - 1] < 7)) dp[i] += dp[i - 2];
	}
	return dp[len];
};

/**
 * @param {string} s
 * @return {number}
 */
// 第二种写法
// 时间复杂度O(n) 空间复杂度O(n)
var numDecodings = function (s) {
	if (!s || !s.length || s[0] == 0) return 0;
	var len = s.length,
		dp = [1];
	for (var i = 1; i < len; i++) {
		if (s[i] == 0 && s[i - 1] > 2) return 0;
		dp[i] = s[i] == 0 ? 0 : dp[i - 1];
		if (s[i - 1] == 1 || (s[i - 1] == 2 && s[i] < 7)) dp[i] += dp[i - 2] || 1;
	}
	return dp[len - 1];
};

/**
 * @param {string} s
 * @return {number}
 */
// 第三种写法
// 时间复杂度O(n) 空间复杂度O(1)
var numDecodings = function (s) {
	if (!s || !s.length || s[0] == 0) return 0;
	var len = s.length,
		prev = (cur = 1);
	for (var i = 1; i < len; i++) {
		var temp = cur;
		if (s[i] == 0 && s[i - 1] > 2) return 0;
		cur = s[i] == 0 ? 0 : cur;
		if (s[i - 1] == 1 || (s[i - 1] == 2 && s[i] < 7)) cur += prev;
		prev = temp;
	}
	return cur;
};

console.log(numDecodings('50926')); // 0
console.log(numDecodings('102')); // 1
console.log(numDecodings('226')); // 3
console.log(numDecodings('22622')); // 6
console.log(numDecodings('2222')); // 5
