// https://leetcode-cn.com/problems/split-array-largest-sum/

/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function (nums, m) {
  var n = nums.length,
      ans = Infinity;
  dfs(nums, 0, 0, 0, 0);
  return ans;
  function dfs (nums, i, subArrNums, curSum, curMax) {
    console.log(i, subArrNums);
    if (i === n && subArrNums === m) {
      ans = Math.min(ans, curMax);
      return;
    }
    if (i === n) return;
    if (i > 0) 
      dfs(nums, i + 1, subArrNums, curSum + nums[i], Math.max(curMax, curSum + nums[i]));
    if (subArrNums < m) 
      dfs(nums, i + 1, subArrNums + 1, nums[i], Math.max(curMax, nums[i]));
  }
};

console.log(splitArray([7, 2, 5], 2));
// console.log(splitArray([7, 2, 5, 10, 8], 2));