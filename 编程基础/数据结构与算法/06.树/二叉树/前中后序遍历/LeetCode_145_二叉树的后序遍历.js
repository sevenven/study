// https://leetcode.cn/problems/binary-tree-postorder-traversal/
// 给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归遍历
// 时间复杂度O(n) 空间复杂度O(logn)
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
// 基于栈遍历
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

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 基于栈遍历-标记法 优点：统一迭代遍历方式 缺点：一个元素需要入栈两次
// 后序遍历-左右根 压栈顺序-根右左
var postorderTraversal = function (root) {
	let stack = [],
		result = [],
		cur;
	if (root) stack.push(root);
	while (stack.length) {
		cur = stack.pop();
		if (!cur) {
			result.push(stack.pop().val);
			continue;
		}
		stack.push(cur);
		stack.push(null);
		cur.right && stack.push(cur.right);
		cur.left && stack.push(cur.left);
	}
	return result;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 莫里斯遍历
// 时间复杂度O(n) 空间复杂度O(1)
var postorderTraversal = function (root) {};
