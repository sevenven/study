// https://leetcode.cn/problems/path-sum/

// 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。
// 叶子节点 是指没有子节点的节点。

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
// 标准回溯写法
// 时间复杂度O(n) 空间复杂度O(logn)
var hasPathSum = function (root, targetSum) {
	if (!root) return false;
	if (!root.left && !root.right) return root.val === targetSum;
	let leftResult = false;
	if (root.left) {
		targetSum -= root.val;
		leftResult = hasPathSum(root.left, targetSum);
		targetSum += root.val;
	}
	let rightResult = false;
	if (root.right) {
		targetSum -= root.val;
		rightResult = hasPathSum(root.right, targetSum);
		targetSum += root.val;
	}
	return leftResult || rightResult;
};

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
// 精简写法
// 时间复杂度O(n) 空间复杂度O(logn)
var hasPathSum = function (root, targetSum) {
	if (!root) return false;
	if (!root.left && !root.right) return root.val === targetSum;
	return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};
