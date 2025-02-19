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
// 后序遍历-左右根--从下往上处理
// 时间复杂度O(h) 空间复杂度O(h)
var lowestCommonAncestor = function (root, p, q) {
	if (!root) return null; // 如果当前节点为空，返回 null，表示没有找到 最近公共祖先
	if (root.val > p.val && root.val > q.val) return lowestCommonAncestor(root.left, p, q); // 前节点的值大于 p 和 q 节点的值，说明 最近公共祖先 在当前节点的左子树中
	if (root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q); // 当前节点的值小于 p 和 q 节点的值，说明 最近公共祖先 在当前节点的右子树中
	// 如果 p 和 q 分别位于当前节点的左右子树中，或者其中一个节点就是当前节点，那么当前节点就是 最近公共祖先
	return root;
};

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 迭代解法
// 时间复杂度O(h) 空间复杂度O(h)
var lowestCommonAncestor = function (root, p, q) {
	let cur = root;
	while (cur) {
		if (p.val < cur.val && q.val < cur.val) cur = cur.left;
		else if (p.val > cur.val && q.val > cur.val) cur = cur.right;
		else return cur;
	}
	return null;
};
