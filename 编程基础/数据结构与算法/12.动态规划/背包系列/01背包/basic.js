// 有n件物品 重量为weight = [1, 3, 4] 价值为value = [15, 20, 30]
// 有一个背包 bagWeight为4
// 每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大

// 方式一 暴力递归
// 时间复杂度|空间复杂度

// 方式二 记忆化递归
// 时间复杂度|空间复杂度

// 方式三 dp
// 时间复杂度O(m*n)|空间复杂度[O(m*n)|O(n)]
/* 
	动规五部曲
		1.确定dp表及其下标的含义 [0-i]物品任取[每种只取一个]放进容量为j的背包里所能得到的最大价值
		2.确定递推公式 dp[i, j] = max(dp[i - 1, j], dp[i - 1, j - weight[i]] + value[i])
		3.dp表初始化 第一行 背包容量 > weight[0]初始化为weight[0] 其余行 背包容量 < weight[i] 初始化为 dp[i - 1][j]
		4.确定遍历顺序 先遍历物品 再遍历背包
		5.填充dp表
*/
var bagWeightProblem = function (weight, value, bagWeight) {
	// // 定义 dp 数组
	// const dp = Array.from({ length: weight.length }, () => Array(bagWeight + 1).fill(0));
	// // 初始化
	// for (let j = weight[0]; j <= bagWeight; j++) dp[0][j] = value[0]
	// // 遍历物品
	// for (let i = 1; i < weight.length; i++) {
	// 	// 遍历背包容量
	// 	for (let j = 0; j <= bagWeight; j++) {
	// 		j  < weight[i] ? dp[i][j] = dp[i - 1][j] : dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i])
	// 	}
	// }
	// return dp[weight.length - 1][bagWeight];
	const dp = Array(bagWeight + 1).fill(0);
	for (let i = 0; i < weight.length; i++) {
		// 倒序遍历保证每个物品只被添加一次
		for (let j = bagWeight; j >= weight[i]; j--) {
			dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
		}
	}
	return dp[bagWeight];
};

console.log(bagWeightProblem([1, 3, 4], [15, 20, 30], 4)); // 35
