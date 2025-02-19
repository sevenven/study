// https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 后序遍历-左右根--从下往上处理
// 时间复杂度O(n) 空间复杂度O(h)
var lowestCommonAncestor = function (root, p, q) {
	if (!root || root === p || root === q) return root;
	const left = lowestCommonAncestor(root.left, p, q);
	const right = lowestCommonAncestor(root.right, p, q);
	return left && right ? root : left || right;
};
