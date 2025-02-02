// https://leetcode.cn/problems/binary-tree-postorder-traversal/
// 给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归遍历
// 时间复杂度O(n) 空间复杂度O(n)
var postorderTraversal = function (root, result = []) {
	if (!root) return result;
	postorderTraversal(root.left, result);
	postorderTraversal(root.right, result);
	result.push(root.val);
	return result;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 模拟栈-深度优先入栈
// 时间复杂度O(n) 空间复杂度O(n)
var postorderTraversal = function (root) {
	if (!root) return [];
	let cur = root,
		prev = null, // 上一个 result node
		stack = [],
		res = [];
	while (cur || stack.length) {
		while (cur) {
			stack.push(cur);
			cur = cur.left;
		}
		cur = stack.pop();
		if (!cur.right || cur.right === prev) {
			res.push(cur.val);
			prev = cur;
			cur = null;
		} else {
			stack.push(cur);
			cur = cur.right;
		}
	}
	return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 模拟栈-广度优先入栈
// 时间复杂度O(n) 空间复杂度O(n)
var postorderTraversal = function (root) {
	if (!root) return [];
	let stack = [root],
		result = [],
		cur;
	while (stack.length) {
		cur = stack.pop();
		result.unshift(cur.val);
		left && stack.push(left);
		right && stack.push(right);
	}
	return result;
};
