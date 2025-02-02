// https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

// 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

// function TreeNode(val, left, right) {
// 	this.val = val === undefined ? 0 : val;
// 	this.left = left === undefined ? null : left;
// 	this.right = right === undefined ? null : right;
// }

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
	if (!preorder.length) return null;
	const node = new TreeNode(preorder[0]),
		mid = inorder.indexOf(preorder[0]);
	node.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
	node.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
	return node;
};

var result = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
console.log(result);
