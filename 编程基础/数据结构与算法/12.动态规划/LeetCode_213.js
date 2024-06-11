// https://leetcode-cn.com/problems/house-robber-ii/

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
	if (!nums || !nums.length) return 0;
	if (nums.length === 1) return nums[0];
	return Math.max(r(nums.slice(1)), r(nums.slice(0, nums.length - 1).reverse()));
	function r(nums) {
		var dp0 = (dp1 = 0);
		for (num of nums) {
			var temp = dp0;
			dp0 = Math.max(dp0, dp1);
			dp1 = temp + num;
		}
		return Math.max(dp0, dp1);
	}
};

console.log(rob([2])); // 2
console.log(rob([2, 3, 2])); // 3
console.log(rob([1, 2, 3, 1])); // 4
