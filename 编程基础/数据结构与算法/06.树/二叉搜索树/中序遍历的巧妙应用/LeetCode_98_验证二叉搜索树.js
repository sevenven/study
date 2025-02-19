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
// 时间复杂度O(n) 空间复杂度O(h)
var isValidBST = function (root, global = { prev: null }) {
	if (!root) return true;
	if (!isValidBST(root.left, global)) return false;
	if (global.prev && global.prev.val >= root.val) return false;
	global.prev = root;
	return isValidBST(root.right, global);
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 递归验证-中序遍历有序-左根右
// 时间复杂度O(n) 空间复杂度O(h)
var isValidBST = function (root, prev = null, next = null) {
	if (!root) return true; // 基本情况：空树是 BST
	if (prev && prev.val >= root.val) return false; // 检查左子树是否违反 BST 规则
	if (next && root.val >= next.val) return false; // 检查右子树是否违反 BST 规则
	return isValidBST(root.left, prev, root) && isValidBST(root.right, root, next);
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 迭代验证-中序遍历有序
// 时间复杂度O(n) 空间复杂度O(h)
var isValidBST = function (root) {
	let cur = root, // 当前节点
		stack = [], // 辅助栈
		prev; // 前一个节点

	while (cur || stack.length > 0) {
		// 遍历左子树，将左子节点全部入栈
		while (cur) {
			stack.push(cur);
			cur = cur.left;
		}
		// 弹出栈顶节点
		cur = stack.pop();
		// 检查当前节点是否大于前一个节点
		if (prev && prev.val >= cur.val) return false;
		// 更新前一个节点，并移动到右子节点
		[prev, cur] = [cur, cur.right];
	}

	return true;
};
