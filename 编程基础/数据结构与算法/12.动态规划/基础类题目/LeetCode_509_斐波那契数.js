// https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/description/

// 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。
// 也就是：F(0) = 0，F(1) = 1 F(n) = F(n - 1) + F(n - 2)，其中 n > 1
// 给定 n ，请计算 F(n) 。

/**
 * @param {number} n
 * @return {number}
 */
// 动态规划 时间复杂度O(n) 空间复杂度[O(n)|O(1)]
/* 
	动规五部曲
		1.确定dp表及其下标的含义 第i个斐波那契数的值为dp[i]
		2.确定递推公式 dp[i] = dp[i - 1] + dp[i - 2]
		3.dp表初始化 [0, 1]
		4.确定遍历顺序 从左至右遍历
		5.填充dp表
*/
var fib = function (n) {
	// const MOD = 1000000007; // 取模 防止数值溢出
	// const dp = [0, 1];
	// for (let i = 2; i <= n; i++) dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
	// return dp[n];
	// 状态压缩 空间复杂度O(1)
	if (n < 2) return n;
	const MOD = 1e9 + 7; // 取模 防止数值溢出
	let dp0 = 0,
		dp1 = 1;
	for (let i = 2; i <= n; i++) [dp0, dp1] = [dp1, (dp0 + dp1) % MOD];
	return dp1;
};

// 测试用例
console.log(fib(0)); // 0 (边界情况)
console.log(fib(1)); // 1 (边界情况)
console.log(fib(2)); // 1 (0+1)
console.log(fib(3)); // 2 (1+1)
console.log(fib(5)); // 5 (2+3)
console.log(fib(10)); // 55
console.log(fib(20)); // 6765
console.log(fib(30)); // 832040 (测试较大数值)
console.log(fib(45)); // 134903163 (测试大数值和模运算)
