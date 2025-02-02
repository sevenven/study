// https://leetcode.cn/problems/balanced-binary-tree/

// 给定一个二叉树，判断它是否是平衡二叉树

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// DFS解法-后序遍历
// 时间复杂度O(n) 空间复杂度O(n)
var isBalanced = function (root) {
	return getDepth(root) !== -1;
};

function getDepth(root) {
	if (!root) return 0;
	let leftDepth = getDepth(root.left); // 左子树高度
	if (leftDepth === -1) return -1;
	let rightDepth = getDepth(root.right); // 右子树高度
	if (rightDepth === -1) return -1;
	if (Math.abs(leftDepth - rightDepth) > 1) return -1;
	return Math.max(leftDepth, rightDepth) + 1;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// DFS解法-前序遍历
// 时间复杂度O(n^2) 空间复杂度O(n)
var isBalanced = function (root) {
	if (!root) return true;
	return Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right);
};

var getHeight = function (root) {
	if (!root) return 0;
	return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
};
