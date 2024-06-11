// https://leetcode-cn.com/problems/palindromic-substrings/

/**
 * @param {string} s
 * @return {number}
 */
// 从中间向两侧延申
// 时间复杂度O(n^2) 空间复杂度O(1)
var countSubstrings = function(s) {
  var len = s.length,
    ans = 0;
  for (var i = 0; i < 2 * len - 1; i++) {
    var left = i >> 1,
        right = left + i % 2;
    while (left >= 0 && right < len && s[left] === s[right]) {
      ans += 1;
      left--;
      right++;
    }
  }
  return ans;
};

/**
 * @param {string} s
 * @return {number}
 */
// dp方程:
// 前提：s[i] === s[j] 
// j-i <= 1 -> dp[i][j] = true
// j-i > 1 -> dp[i][j] = dp[i+1][j-1]
var countSubstrings = function(s) {
  var len = s.length,
    dp = [],
    ans = 0;
  for (var i = len - 1; i >= 0; i--) {
    dp[i] = new Array(len).fill(false);
    for (var j = i; j < len; j++) {
      if (s[i] === s[j] && (j - i <= 1 || dp[i+1][j-1])) {
        dp[i][j] = true;
        ans += 1;
      }
    }
  }
  return ans;
};

console.log(countSubstrings('aba')); // 4
console.log(countSubstrings('abba')); // 6