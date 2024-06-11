// https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/

// 给定两个整数数组 inorder 和 postorder
// 其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。

// function TreeNode(val, left, right) {
// 	this.val = val === undefined ? 0 : val;
// 	this.left = left === undefined ? null : left;
// 	this.right = right === undefined ? null : right;
// }

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
	if (!postorder.length) return null;
	const node = new TreeNode(postorder[postorder.length - 1]),
		mid = inorder.indexOf(postorder[postorder.length - 1]);
	node.left = buildTree(inorder.slice(0, mid), postorder.slice(0, mid));
	node.right = buildTree(inorder.slice(mid + 1), postorder.slice(mid, postorder.length - 1));
	return node;
};

console.log(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]));
console.log(buildTree([2, 1], [2, 1]));
