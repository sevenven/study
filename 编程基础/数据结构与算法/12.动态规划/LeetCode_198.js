// https://leetcode-cn.com/problems/house-robber/

// dp方程
// dp[i, 0] = max {dp[i-1, 0], dp[i-1, 1]} // 不偷
// dp[i, 1] = dp[i-1, 0] + a[i] // 偷
// max{dp[i, 0], dp[i, 1]}

/**
 * @param {number[]} nums
 * @return {number}
 */
// dp状态使用二维数组记录偷窃每一个房子的可能情况
// 时间复杂度O(n) 空间复杂度O(n)
var rob = function (nums) {
	var len = nums.length,
		dp = [[0, nums[0] || 0]];
	for (var i = 1; i < len; i++) {
		dp[i] = [];
		dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
		dp[i][1] = dp[i - 1][0] + nums[i];
	}
	return Math.max(dp[dp.length - 1][0], dp[dp.length - 1][1]);
};

// dp状态使用两个变量记录当前房子可能的偷窃情况
// 时间复杂度O(n) 空间复杂度O(1)
var rob = function (nums) {
	var dp0 = (dp1 = 0);
	for (num of nums) {
		var temp = dp0;
		dp0 = Math.max(dp0, dp1);
		dp1 = temp + num;
	}
	return Math.max(dp0, dp1);
};

// dp方程：dp[i] = max{dp[i-1], dp[i-2] + a[i]}
// dp状态使用一维数组记录偷或者不偷当前房子所能得到的最大值
// 时间复杂度O(n) 空间复杂度O(n)
var rob = function (nums) {
	var len = nums.length,
		dp = [nums[0] || 0, Math.max(nums[0] || 0, nums[1] || 0)];
	for (var i = 2; i < len; i++) {
		dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
	}
	return dp[dp.length - 1];
};

console.log(rob([1, 2, 3, 1])); // 4
console.log(rob([2, 7, 9, 3, 1])); // 12
console.log(rob([])); // 0
console.log(rob([1])); // 1
