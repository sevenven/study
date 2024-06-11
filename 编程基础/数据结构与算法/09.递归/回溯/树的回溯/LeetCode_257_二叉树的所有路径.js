// https://leetcode.cn/problems/binary-tree-paths/description/

// 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。
// 叶子节点 是指没有子节点的节点。

/**
 * @param {TreeNode} root
 * @return {string[]}
 */
// 时间复杂度O(n) 空间复杂度O(logn)
var binaryTreePaths = function (root, path = '', result = []) {
	if (!root.left && !root.right) result.push(path + root.val);
	path = path + root.val + '->';
	root.left && binaryTreePaths(root.left, path, result);
	root.right && binaryTreePaths(root.right, path, result);
	return result;
};
