// https://leetcode.cn/problems/trim-a-binary-search-tree/description/

// 给你二叉搜索树的根节点 root ，同时给定最小边界low 和最大边界 high。
// 通过修剪二叉搜索树，使得所有节点的值在[low, high]中。修剪树 不应该 改变 保留在树中的元素的相对结构 (即，如果没有被移除，原有的父代子代关系都应当保留)。 可以证明，存在 唯一的答案 。
// 所以结果应当返回修剪好的二叉搜索树的新的根节点。注意，根节点可能会根据给定的边界发生改变。

/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
// 递归修剪
// 时间复杂度O(n) 空间复杂度O(h)
var trimBST = function (root, low, high) {
	if (!root) return null; // 如果当前节点为空，直接返回null
	if (root.val < low) return trimBST(root.right, low, high); // 如果当前节点的值小于low，说明左子树的所有节点都小于low，直接修剪右子树
	if (root.val > high) return trimBST(root.left, low, high); // 如果当前节点的值大于high，说明右子树的所有节点都大于high，直接修剪左子树
	// 如果当前节点的值在[low, high]范围内，递归修剪左右子树
	root.left = trimBST(root.left, low, high); // 修剪左子树
	root.right = trimBST(root.right, low, high); // 修剪右子树
	return root; // 返回修剪后的当前节点
};
