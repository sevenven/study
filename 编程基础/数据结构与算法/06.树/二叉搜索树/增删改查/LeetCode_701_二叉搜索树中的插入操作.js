// https://leetcode.cn/problems/insert-into-a-binary-search-tree/description/

// 给定二叉搜索树（BST）的根节点 root 和要插入树中的值 value ，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。
// 输入数据 保证 ，新值和原始二叉搜索树中的任意节点值都不同。

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
// 递归插入
var insertIntoBST = function (root, val) {
	if (!root) return new TreeNode(val);
	if (val < root.val) root.left = insertIntoBST(root.left, val);
	if (val > root.val) root.right = insertIntoBST(root.right, val);
	return root;
};

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
// 迭代插入
var insertIntoBST = function (root, val) {
	let cur = root;
	while (cur) {
		if (val < cur.val) {
			if (!cur.left) break;
			cur = cur.left;
		} else if (val > cur.val) {
			if (!cur.right) break;
			cur = cur.right;
		}
	}
	if (val < cur.val) cur.left = new TreeNode(val);
	if (val > cur.val) cur.right = new TreeNode(val);
	return root;
};
