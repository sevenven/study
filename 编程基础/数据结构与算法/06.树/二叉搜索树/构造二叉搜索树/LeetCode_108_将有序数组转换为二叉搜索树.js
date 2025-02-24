// https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/

// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
// 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// 时间复杂度O(n) 空间复杂度O(logn)
var sortedArrayToBST = function (nums, L = 0, R = nums.length - 1) {
	if (L > R) return null; // 如果左边界大于右边界，说明当前区间无效，返回 null
	const mid = (L + R) >> 1; // 计算当前区间的中间索引，使用位运算 `>> 1` 代替除以 2，效率更高
	const root = new TreeNode(nums[mid]); // 以中间元素为根节点，创建一个新的树节点
	root.left = sortedArrayToBST(nums, L, mid - 1); // 递归构建左子树，区间为 [L, mid - 1]
	root.right = sortedArrayToBST(nums, mid + 1, R); // 递归构建右子树，区间为 [mid + 1, R]
	return root; // 返回当前构建的根节点
};
