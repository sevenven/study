// https://leetcode.cn/problems/convert-bst-to-greater-tree/description/

// 给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 回溯解法
var convertBST = function (root, accumulator = { sum: 0 }) {
	if (!root) return root; // 当前节点为空直接返回: 递归结束条件之一
	convertBST(root.right, accumulator); // 处理右子树
	root.val += accumulator.sum; // 更新当前节点值：原节点值加上accumulator.sum（即之前访问过的所有节点值之和）
	accumulator.sum = root.val; // 更新累加器: 以便于后续节点进行累加操作
	convertBST(root.left, accumulator); // 处理左子树
	return root; // 返回根节点
};
