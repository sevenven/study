// https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/description/

// 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
// 最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
// 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 迭代解法
var lowestCommonAncestor = function (root, p, q) {
	let cur = root;
	while (cur) {
		if (p.val < cur.val && q.val < cur.val) cur = cur.left;
		else if (p.val > cur.val && q.val > cur.val) cur = cur.right;
		else return cur;
	}
	return null;
};

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 递归解法
var lowestCommonAncestor = function (root, p, q) {
	if (!root) return null;
	if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);
	if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);
	return root;
};
