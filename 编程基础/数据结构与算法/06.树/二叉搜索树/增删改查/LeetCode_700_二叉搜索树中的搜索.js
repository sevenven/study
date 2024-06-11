// https://leetcode.cn/problems/search-in-a-binary-search-tree/description/

// 给定二叉搜索树（BST）的根节点 root 和一个整数值 val。
// 你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null 。

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
// 递归查找
var searchBST = function (root, val) {
	// if (!root || root.val === val) return root;
	// let result;
	// if (val < root.val) result = searchBST(root.left, val);
	// else if (val > root.val) result = searchBST(root.right, val);
	// return result;
	if (!root || root.val === val) return root;
	if (val < root.val) return searchBST(root.left, val);
	else if (val > root.val) return searchBST(root.right, val);
};

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
// 迭代查找
var searchBST = function (root, val) {
	let cur = root;
	while (cur) {
		if (val < cur.val) cur = cur.left;
		else if (val > cur.val) cur = cur.right;
		else break;
	}
	return cur;
};
