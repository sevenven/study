// https://leetcode.cn/problems/minimum-absolute-difference-in-bst/description/

// 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
// 差值是一个正数，其数值等于两值之差的绝对值。

/**
 * @param {TreeNode} root
 * @return {number}
 */
// 回溯
var getMinimumDifference = function (root, global = { prev: null, min: Infinity }) {
	if (!root) return 0;
	getMinimumDifference(root.left, global);
	if (global.prev) global.min = Math.min(global.min, root.val - global.prev.val);
	global.prev = root;
	getMinimumDifference(root.right, global);
	return global.min;
};
