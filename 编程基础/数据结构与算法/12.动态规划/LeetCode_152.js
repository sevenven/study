// https://leetcode-cn.com/problems/maximum-product-subarray/

/**
 * @param {number[]} nums
 * @return {number}
 */
// 本题关键 负数乘以较小的数反而会更大
// dp状态存储当前最大值和最小值(正值和负值都会有)
// 时间复杂度O(n) 空间复杂度O(1)
var maxProduct = function (nums) {
	var len = nums.length,
		max = (dp1 = dp2 = nums[0]);
	for (var i = 1; i < len; i++) {
		if (nums[i] < 0) {
			var temp = dp1;
			dp1 = dp2;
			dp2 = temp;
		}
		dp1 = Math.max(dp1 * nums[i], nums[i]);
		dp2 = Math.min(dp2 * nums[i], nums[i]);
		max = Math.max(max, dp1);
	}
	return max;
};

console.log(maxProduct([2, 3, -2, 4])); // 9
console.log(maxProduct([2, 3, -2, 4, -2])); // 96
console.log(maxProduct([2, 3, -2, 4, -2, -60])); // 480
