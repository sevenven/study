// https://leetcode.cn/problems/kth-smallest-element-in-a-bst/

// 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k, result = []) {
  if (!root) return;
  kthSmallest(root.left, k, result);
  result.push(root.val);
  kthSmallest(root.right, k, result);
  return result[k - 1];
};

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let stack = [],
    count = 0,
    cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    if (k === ++count) return cur.val;
    cur = cur.right;
  }
};
