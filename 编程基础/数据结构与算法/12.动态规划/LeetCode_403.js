// https://leetcode-cn.com/problems/frog-jump/

/**
 * @param {number[]} stones
 * @return {boolean}
 */
// 递归+记忆化搜索
// 时间复杂度O(n^3) 空间复杂度O(n^2)
var canCross = function (stones) {
  return cross(stones, 0, 0, []);
  function cross (stones, pos, jumpsize, cache) {
    if (cache[pos] === undefined) cache[pos] = [];
    if (cache[pos][jumpsize]) return cache[pos][jumpsize];
    var len = stones.length;
    for (var i = pos + 1; i < len; i++) {
      var gap = stones[i] - stones[pos];
      if (gap === jumpsize - 1 || gap === jumpsize || gap === jumpsize + 1) {
        if (cross(stones, i, gap, cache)) return cache[i][gap] = true;
      }
    }
    return cache[pos][jumpsize] = pos === len - 1 ? true : false;
  }
};

/**
 * @param {number[]} stones
 * @return {boolean}
 */
// 动态规划
// 时间复杂度O(n^2) 空间复杂度O(n)
var canCross = function (stones) {
  var len = stones.length;
    dp = [{0: true}];
  for (var i = 1; i < len; i++) {
    dp[i] = {};
    for (var j = 0; j < i; j++) {
      var gap = stones[i] - stones[j];
      for (step in dp[j]) {
        step = Number(step);
        if (step - 1 === gap || step === gap || step + 1 === gap) 
          dp[i][gap] = true;
      }
    }
  }
  return JSON.stringify(dp[len-1]) !== '{}';
};

console.log(canCross([0, 1, 3]));
console.log(canCross([0, 1, 3, 5, 6, 8, 12, 17]));
console.log(canCross([0, 1, 2, 3, 4, 8, 9, 11]));