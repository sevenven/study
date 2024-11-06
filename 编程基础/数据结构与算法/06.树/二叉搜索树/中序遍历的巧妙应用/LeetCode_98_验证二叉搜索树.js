// https://leetcode-cn.com/problems/validate-binary-search-tree/
// 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

// 有效 二叉搜索树定义如下：
// 节点的左子树只包含 小于 当前节点的数。
// 节点的右子树只包含 大于 当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 回溯验证-中序遍历有序-左根右
var isValidBST = function (root, global = { prev: null }) {
	if (!root) return true;
	const leftValid = isValidBST(root.left, global);
	if (global.prev && global.prev.val >= root.val) return false;
	global.prev = root;
	const rightValid = isValidBST(root.right, global);
	return leftValid && rightValid;
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 递归验证-中序遍历有序-左根右
var isValidBST = function (root, prev = null, next = null) {
	if (!root) return true;
	if (prev && prev.val >= root.val) return false;
	if (next && root.val >= next.val) return false;
	return isValidBST(root.left, prev, root) && isValidBST(root.right, root, next);
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 迭代验证-中序遍历有序
var isValidBST = function (root) {
	let cur = root,
		stack = [],
		prev;
	while (cur || stack.length > 0) {
		while (cur) {
			stack.push(cur);
			cur = cur.left;
		}
		cur = stack.pop();
		if (prev && prev.val >= cur.val) return false;
		[prev, cur] = [cur, cur.right];
	}
	return true;
};
