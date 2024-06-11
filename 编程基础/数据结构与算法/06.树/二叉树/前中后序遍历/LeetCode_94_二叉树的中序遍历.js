// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
// 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归遍历
// 时间复杂度O(n) 空间复杂度O(logn)
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
// 基于栈遍历
// 时间复杂度O(n) 空间复杂度O(n)
var inorderTraversal = function (root) {
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

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 基于栈遍历-标记法 优点：统一迭代遍历方式 缺点：一个元素需要入栈两次
// 中序遍历-左根右 压栈顺序-右根左
var inorderTraversal = function (root) {
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
		stack.push(cur);
		stack.push(null);
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
var inorderTraversal = function (root) {
	let cur = root,
		prev,
		result = [];
	while (cur) {
		if (cur.left) {
			// prev->中序遍历当中cur的上一个节点
			prev = cur.left;
			while (prev.right && prev.right !== cur) prev = prev.right;
			if (!prev.right) {
				// 让 prev 的右指针指向 cur，继续遍历左子树
				[prev.right, cur] = [cur, cur.left];
			} else {
				// 说明当前节点的左子树已经访问完了，当前节点进入result
				result.push(cur.val);
				[prev.right, cur] = [null, cur.right];
			}
		} else {
			// 如果没有左孩子 就可以加入到result中
			result.push(cur.val);
			cur = cur.right;
		}
	}
	return result;
};
