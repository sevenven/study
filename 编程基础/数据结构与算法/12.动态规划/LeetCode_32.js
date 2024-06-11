// https://leetcode-cn.com/problems/longest-valid-parentheses/

/**
 * @param {string} s
 * @return {number}
 */
// 使用栈
// 时间复杂度O(n) 空间复杂度O(n)
var longestValidParentheses = function (s) {
  var len = s.length,
    stack = [-1],
    max = 0;
  for (var i = 0; i < len; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length <= 0) stack.push(i);
      else max = Math.max(max, i - stack[stack.length - 1]);
    }
  }
  return max;
};

/**
 * @param {string} s
 * @return {number}
 */
// 动态规划
// 时间复杂度O(n) 空间复杂度O(n)
var longestValidParentheses = function (s) {
  var len = s.length,
    dp = new Array(len).fill(0),
    max = 0;
  for (var i = 1; i < len; i++) {
    if (s[i] === ")") {
      if (s[i - 1] === "(") {
        dp[i] = 2 + (i - 2 > 0 ? dp[i - 2] : 0);
      } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] == "(") {
        dp[i] =
          2 + dp[i - 1] + (i - dp[i - 1] - 2 > 0 ? dp[i - dp[i - 1] - 2] : 0);
      }
      max = Math.max(max, dp[i]);
    }
  }
  return max;
};

console.log(longestValidParentheses(")()())")); // 4
console.log(longestValidParentheses("()(()")); // 2
console.log(longestValidParentheses("()()()(())")); //10
