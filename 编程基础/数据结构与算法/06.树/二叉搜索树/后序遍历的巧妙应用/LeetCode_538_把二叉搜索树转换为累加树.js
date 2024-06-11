// https://leetcode.cn/problems/convert-bst-to-greater-tree/description/

// 给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 回溯解法
var convertBST = function (root, global = { preVal: 0 }) {
	if (!root) return root;
	convertBST(root.right, global);
	root.val += global.preVal;
	global.preVal = root.val;
	convertBST(root.left, global);
	return root;
};
