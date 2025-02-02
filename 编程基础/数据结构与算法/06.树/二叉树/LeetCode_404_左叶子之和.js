// https://leetcode.cn/problems/sum-of-left-leaves/description/

// 给定二叉树的根节点 root ，返回所有左叶子之和。

/**
 * @param {TreeNode} root
 * @return {number}
 */
// DFS-后序遍历
// 时间复杂度O(n) 空间复杂度O(n)
var sumOfLeftLeaves = function (root) {
	if (!root) return 0;
	if (isLeafNode(root)) return 0;
	return (root.left && isLeafNode(root.left) ? root.left.val : sumOfLeftLeaves(root.left)) + sumOfLeftLeaves(root.right);
};

var isLeafNode = function (node) {
	return !node.left && !node.right;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
// 回溯
// 时间复杂度O(n) 空间复杂度O(n)
var sumOfLeftLeaves = function (root, isLeft = false, result = { val: 0 }) {
	if (!root.left && !root.right && isLeft) result.val += root.val;
	root.left && sumOfLeftLeaves(root.left, true, result);
	root.right && sumOfLeftLeaves(root.right, false, result);
	return result.val;
};
