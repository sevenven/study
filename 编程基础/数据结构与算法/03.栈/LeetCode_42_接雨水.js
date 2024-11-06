// https://leetcode-cn.com/problems/trapping-rain-water/
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

/**
 * @param {number[]} height
 * @return {number}
 */
// 暴力破解 时间复杂度O(n^2) 空间复杂度O(1)
var trap = function (height) {
  let ans = 0;
  for (let i = 1; i < height.length - 1; i++) {
    let maxLeft = (maxRight = height[i]);
    for (let j = 0; j < i; j++) {
      maxLeft = Math.max(maxLeft, height[j]);
    }
    for (let j = i + 1; j < height.length; j++) {
      maxRight = Math.max(maxRight, height[j]);
    }
    ans += Math.min(maxLeft, maxRight) - height[i];
  }
  return ans;
};

/**
 * @param {number[]} height
 * @return {number}
 */
// 遍历存储每个格子的左边最高墙和右边最高墙 时间复杂度O(n) 空间复杂度O(n)
var trap = function (height) {
  let ans = 0,
    maxLeft = [],
    maxRight = [];
  maxLeft[0] = height[0];
  for (let i = 1; i < height.length - 1; i++) {
    maxLeft[i] = Math.max(maxLeft[i - 1], height[i]);
  }
  maxRight[height.length - 1] = height[height.length - 1];
  for (let i = height.length - 2; i >= 1; i--) {
    maxRight[i] = Math.max(maxRight[i + 1], height[i]);
  }
  for (let i = 1; i < height.length - 1; i++) {
    ans += Math.min(maxLeft[i], maxRight[i]) - height[i];
  }
  return ans;
};

/**
 * @param {number[]} height
 * @return {number}
 */
// 双指针法 时间复杂度O(n) 空间复杂度O(1)
var trap = function (height) {
  let ans = 0,
    L = 0,
    R = height.length - 1,
    maxLeft = 0,
    maxRight = 0;
  while (L < R) {
    if (height[L] <= height[R]) {
      maxLeft = Math.max(maxLeft, height[L]);
      ans += maxLeft - height[L];
      L++;
    } else {
      maxRight = Math.max(maxRight, height[R]);
      ans += maxRight - height[R];
      R--;
    }
  }
  return ans;
};

/**
 * @param {number[]} height
 * @return {number}
 */
// 使用栈查找左右边界
var trap = function (height) {
  let stack = [],
    ans = 0;
  for (let i = 0; i < height.length; i++) {
    while (stack.length && height[i] > height[stack.top()]) {
      let cur = stack.pop();
      if (stack.length === 0) break;
      let width = i - stack.top() - 1,
        minHeight = Math.min(height[i], height[stack.top()]) - height[cur];
      ans += width * minHeight;
    }
    stack.push(i);
  }
  return ans;
};

Array.prototype.top = function () {
  return this[this.length - 1];
};

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trap([4, 2, 0, 3, 2, 5])); // 9
