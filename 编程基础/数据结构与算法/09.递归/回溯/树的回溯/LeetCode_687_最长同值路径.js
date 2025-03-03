// https://leetcode.cn/problems/longest-univalue-path/

// 给定一个二叉树的 root ，返回 最长的路径的长度 ，这个路径中的 每个节点具有相同值 。 这条路径可以经过也可以不经过根节点。
// 两个节点之间的路径长度 由它们之间的边数表示。

/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestUnivaluePath = function (root) {
  let max = 0;
  getUnivaluePath(root, -1);
  return max;
  function getUnivaluePath(root, val) {
    if (!root) return 0;
    const left = getUnivaluePath(root.left, root.val),
      right = getUnivaluePath(root.right, root.val);
    max = Math.max(max, left + right);
    return root.val === val ? Math.max(left, right) + 1 : 0;
  }
};
