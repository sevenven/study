// https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
// 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归遍历
// 时间复杂度O(n) 空间复杂度O(logn)
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
// 基于栈遍历
// 时间复杂度O(n) 空间复杂度O(n)
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

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 基于栈遍历-标记法 优点：统一迭代遍历方式 缺点：一个元素需要入栈两次
// 前序遍历-根左右 压栈顺序-右左根
var preorderTraversal = function (root) {
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
		cur.right && stack.push(cur.right);
		cur.left && stack.push(cur.left);
		stack.push(cur);
		stack.push(null);
	}
	return result;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 莫里斯遍历
// 时间复杂度O(n) 空间复杂度O(1)
var preorderTraversal = function (root) {
	let cur = root,
		prev,
		result = [];
	while (cur) {
		if (cur.left) {
			prev = cur.left;
			while (prev.right && prev.right !== cur) prev = prev.right;
			if (!prev.right) {
				result.push(cur.val);
				[prev.right, cur] = [cur, cur.left];
			} else {
				[prev.right, cur] = [null, cur.right];
			}
		} else {
			result.push(cur.val);
			cur = cur.right;
		}
	}
	return result;
};
