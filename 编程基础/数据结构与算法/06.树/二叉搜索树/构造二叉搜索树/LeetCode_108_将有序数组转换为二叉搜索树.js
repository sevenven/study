// https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/

// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
// 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums, L = 0, R = nums.length - 1) {
	if (L > R) return null;
	const mid = (L + R) >> 1,
		root = new TreeNode(nums[mid]);
	root.left = sortedArrayToBST(nums, L, mid - 1);
	root.right = sortedArrayToBST(nums, mid + 1, R);
	return root;
};
