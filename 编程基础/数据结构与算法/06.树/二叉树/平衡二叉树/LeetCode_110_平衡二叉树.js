// https://leetcode.cn/problems/balanced-binary-tree/

// 给定一个二叉树，判断它是否是平衡二叉树

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
	return getDepth(root) !== -1;
};

function getDepth(root) {
	if (!root) return 0;
	let leftDepth = getDepth(root.left); //左子树高度
	if (leftDepth === -1) return -1;
	let rightDepth = getDepth(root.right); //右子树高度
	if (rightDepth === -1) return -1;
	if (Math.abs(leftDepth - rightDepth) > 1) return -1;
	return 1 + Math.max(leftDepth, rightDepth);
}
