// https://leetcode-cn.com/problems/power-of-two/

/**
 * @param {number} n
 * @return {boolean}
 */
// 时间复杂度O(logn) 空间复杂度O(1)
var isPowerOfTwo = function(n) {
  if (n === 0) return false;
  while ((n & 1) === 0) 
    n = n >> 1;
  return n === 1;
};

/**
 * @param {number} n
 * @return {boolean}
 */
// 时间复杂度O(1) 空间复杂度O(1)
var isPowerOfTwo = function(n) {
  return n > 0 && (n & -n) === n;
};

/**
 * @param {number} n
 * @return {boolean}
 */
// 时间复杂度O(1) 空间复杂度O(1)
var isPowerOfTwo = function(n) {
  return n > 0 && (n & (n - 1)) === 0;
};

console.log(isPowerOfTwo(1)); // true
console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(218)); // false