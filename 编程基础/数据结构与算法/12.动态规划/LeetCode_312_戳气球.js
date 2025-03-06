// https://leetcode-cn.com/problems/burst-balloons/

// dp方程：
// dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + nums[i] * nums[k] * nums[j])

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function(nums) {
  var nums1 = [1, ...nums, 1],
    len = nums1.length,
    dp = [];
  for(var i = 0; i < len; i++) 
    dp[i] = new Array(len).fill(0);
  for (var i = len - 2; i >= 0; i--) {
    for (var j = i + 2; j < len; j++) {
      for (var k = i + 1; k < j; k++) {
        debugger
        dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + nums1[i] * nums1[k] * nums1[j])
      }
    }
  }
  return dp[0][len-1];
};

console.log(maxCoins([3, 1, 5, 8]));
console.log(maxCoins([3, 1, 5]));
console.log(maxCoins([3, 1]));
console.log(maxCoins([3]));