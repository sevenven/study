// https://leetcode.cn/problems/longest-consecutive-sequence/

// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 哈希表
// 时间复杂度O(n) 空间复杂度O(1)
var longestConsecutive = function (nums) {
  if (nums.length === 0) return 0;
  const map = new Map();
  for (let num of nums) map.set(num, 1);
  for (let i in nums) {
    if (map.has(nums[i] - 1)) map.set(nums[i], 0);
  }
  let maxLen = 1,
    seqCount;
  for (let num of nums) {
    if (map.get(num) === 1) {
      seqCount = 1;
      while (map.has(num + seqCount)) seqCount++;
      maxLen = Math.max(maxLen, seqCount);
    }
  }
  return maxLen;
};

console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
