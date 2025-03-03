// https://leetcode.cn/problems/diameter-of-binary-tree

// 给你一棵二叉树的根节点，返回该树的 直径 。
// 二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root 。
// 两节点之间路径的 长度 由它们之间边数表示。

/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let diamerter = 0;
  traversal(root);
  return diamerter;
  function traversal(root) {
    if (!root) return 0;
    const left = traversal(root.left);
    const right = traversal(root.right);
    diamerter = Math.max(diamerter, left + right);
    return 1 + Math.max(left, right);
  }
};
