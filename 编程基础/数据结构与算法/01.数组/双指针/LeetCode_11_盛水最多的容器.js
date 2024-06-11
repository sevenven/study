// https://leetcode-cn.com/problems/container-with-most-water/
// 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
// 返回容器可以储存的最大水量。
// 说明：你不能倾斜容器。

/**
 * @param {number[]} height
 * @return {number}
 */
// 暴力破解 时间复杂度O(n^2) 空间复杂度O(1)
var maxArea = function (height) {
  let maxarea = 0;
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      maxarea = Math.max(maxarea, (j - i) * Math.min(height[i], height[j]));
    }
  }
  return maxarea;
};

/**
 * @param {number[]} height
 * @return {number}
 */
// 双指针法 时间复杂度O(n) 空间复杂度O(1)
var maxArea = function (height) {
  let maxarea = 0,
    L = 0,
    R = height.length - 1;
  while (L < R) {
    maxarea = Math.max(
      maxarea,
      (R - L) * (height[L] < height[R] ? height[L++] : height[R--])
    );
  }
  return maxarea;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
