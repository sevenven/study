// https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/
// 给定一个 n 叉树的根节点 root ，返回 其节点值的 后序遍历 。

/**
 * @param {Node} root
 * @return {number[]}
 */
// 递归遍历
// 时间复杂度O(n) 空间复杂度O(logn)
var postorder = function (root) {
	if (!root) return result;
	for (let child of root.children) postorder(child, result);
	result.push(root.val);
	return result;
};

// 使用栈
// 时间复杂度O(n) 空间复杂度O(1)
var postorder = function (root) {
	if (!root) return [];
	let stack = [root],
		result = [],
		cur;
	while (stack.length) {
		cur = stack.pop();
		result.unshift(cur.val);
		for (let child of cur.children) stack.push(child);
	}
	return result;
};
