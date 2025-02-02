// https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
// 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归遍历
// 时间复杂度O(n) 空间复杂度O(n)
var preorderTraversal = function (root, result = []) {
	if (!root) return result;
	result.push(root.val);
	preorderTraversal(root.left, result);
	preorderTraversal(root.right, result);
	return result;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 模拟栈-深度优先入栈
// 时间复杂度O(n) 空间复杂度O(n)
var preorderTraversal = function (root) {
	if (!root) return [];
	let cur = root,
		stack = [],
		res = [];
	while (cur || stack.length) {
		while (cur) {
			res.push(cur.val);
			stack.push(cur);
			cur = cur.left;
		}
		cur = stack.pop();
		cur = cur.right;
	}
	return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 模拟栈-广度优先入栈
// 时间复杂度O() 空间复杂度O()
var preorderTraversal = function (root) {
	if (!root) return [];
	let stack = [root],
		result = [],
		cur;
	while (stack.length) {
		cur = stack.pop();
		result.push(cur.val);
		cur.right && stack.push(cur.right);
		cur.left && stack.push(cur.left);
	}
	return result;
};
