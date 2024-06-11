// https://leetcode.cn/problems/binary-tree-maximum-path-sum/

// 二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。
// 路径和 是路径中各节点值的总和。
// 给你一个二叉树的根节点 root ，返回其 最大路径和 。

/**
 * @param {Treeroot} root
 * @return {number}
 */
var maxPathSum = function (root) {
  var max = -Number.MAX_VALUE;
  getMaxSum(root);
  return max;
  function getMaxSum(root) {
    if (!root) return 0;
    var leftSum = getMaxSum(root.left);
    var rightSum = getMaxSum(root.right);
    max = Math.max(max, root.val + leftSum + rightSum);
    return Math.max(0, root.val + leftSum, root.val + rightSum);
  }
};
