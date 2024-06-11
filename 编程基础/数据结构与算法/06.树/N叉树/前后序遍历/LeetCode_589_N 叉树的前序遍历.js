// https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/
// 给定一个 n 叉树的根节点  root ，返回 其节点值的 前序遍历 。

/**
 * @param {Node} root
 * @return {number[]}
 */
// 递归遍历
// 时间复杂度O(n) 空间复杂度O(logn)
var preorder = function (root, result = []) {
	if (!root) return result;
	result.push(root.val);
	for (let child of root.children) preorder(child, result);
	return result;
};

/**
 * @param {Node} root
 * @return {number[]}
 */
// 使用栈
// 时间复杂度O(n) 空间复杂度O(n)
var preorder = function (root) {
	if (!root) return [];
	let stack = [root],
		result = [],
		cur;
	while (stack.length) {
		cur = stack.pop();
		result.push(cur.val);
		for (let i = cur.children.length - 1; i >= 0; i--) {
			stack.push(cur.children[i]);
		}
	}
	return result;
};
