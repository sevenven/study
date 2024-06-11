// https://leetcode-cn.com/problems/largest-rectangle-in-histogram/
// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。

/**
 * @param {number[]} heights
 * @return {number}
 */
// 暴力破解 时间复杂度O(n^2) 空间复杂度O(1)
var largestRectangleArea = function (heights) {
  let maxArea = 0,
    minHeight;
  for (let i = 0; i < heights.length; i++) {
    minHeight = heights[i];
    for (let j = i; j < heights.length; j++) {
      minHeight = Math.min(minHeight, heights[j]);
      maxArea = Math.max(maxArea, (j - i + 1) * minHeight);
    }
  }
  return maxArea;
};

/**
 * @param {number[]} heights
 * @return {number}
 */
// 使用栈找出左右两边比自身高的柱子 入栈时候还存在的柱子是左边界 出栈时候枚举到的柱子是右边界
// 时间复杂度O(n) 空间复杂度O(n)
var largestRectangleArea = function (heights) {
  let stack = [-1],
    maxArea = 0;
  for (let i = 0; i < heights.length; i++) {
    while (stack.top() !== -1 && heights[i] < heights[stack.top()]) {
      maxArea = Math.max(maxArea, heights[stack.pop()] * (i - stack.top() - 1));
    }
    stack.push(i);
  }
  while (stack.top() !== -1) {
    maxArea = Math.max(
      maxArea,
      heights[stack.pop()] * (heights.length - stack.top() - 1)
    );
  }
  return maxArea;
};

Array.prototype.top = function () {
  return this[this.length - 1];
};

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([1, 1, 7])); // 7
