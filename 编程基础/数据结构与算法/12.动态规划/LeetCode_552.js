// https://leetcode-cn.com/problems/student-attendance-record-ii/

// dp方程：
// 以P结尾：P(i) = P(i-1) + L(i-1) + A(i-1)
// 以L结尾：L(i) = P(i-1) + A(i-1) + P(i-2) + A(i-2)
// 以A结尾: A(i) = A(i-1) + A(i-2) + A(i-3)

/**
 * @param {number} n
 * @return {number}
 */
var checkRecord = function(n) {
  if (n === 1) return 3;
  var mode = 1000000007,
    P = [1],
    L = [1, 3],
    A = [1, 2, 4];
  for (var i = 1; i < n; i++) {
    P[i-1] %= mode;
    L[i-1] %= mode;
    A[i-1] %= mode;
    P[i] = ((A[i-1] + P[i-1]) % mode + L[i-1]) % mode;
    if(i > 1) L[i] = ((A[i-1] + P[i-1]) % mode + (A[i-2] + P[i-2]) % mode) % mode;
    if(i > 2) A[i] = ((A[i-1] + A[i-2]) % mode + A[i-3]) % mode;
  }
  return ((A[n-1] % mode + P[n-1] % mode) % mode + L[n-1] % mode) % mode;
};

// dp方程：
// 没有A dp[i] = 2dp[i-1] - dp[i-4];
// 有一个A sum:dp[i] = dp[i-1] * dp[n-i]

/**
 * @param {number} n
 * @return {number}
 */
// var checkRecord = function(n) {
//   var mode = 1000000007;
//     dp = [1, 2, 4, 7],
//     sum = 0;
//   for (var i = 4; i <= n; i++) 
//     dp[i] = (2 * dp[i-1]) % mode + (mode - dp[i-4]) % mode;
//   sum = dp[n];
//   for (var i = 1; i <= n; i++) 
//     sum += (dp[i-1] * dp[n-i]) % mode;
//   return (sum % mode);
// };

console.log(checkRecord(2)); // 8
console.log(checkRecord(4)); // 43
console.log(checkRecord(9)); // 1753
console.log(checkRecord(500));  // 757982199
console.log(checkRecord(1000)); // 250434094