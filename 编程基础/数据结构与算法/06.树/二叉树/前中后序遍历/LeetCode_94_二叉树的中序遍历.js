// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
// 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归遍历
// 时间复杂度O(n) 空间复杂度O(n)
var inorderTraversal = function (root, result = []) {
	if (!root) return result;
	inorderTraversal(root.left, result);
	result.push(result.val);
	inorderTraversal(root.right, result);
	return result;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 模拟栈-深度优先入栈
// 时间复杂度O(n) 空间复杂度O(n)
var inorderTraversal = function (root) {
	if (!root) return [];
	let cur = root,
		stack = [],
		result = [];
	while (cur || stack.length) {
		while (cur) {
			stack.push(cur);
			cur = cur.left;
		}
		cur = stack.pop();
		result.push(cur.val);
		cur = cur.right;
	}
	return result;
};
