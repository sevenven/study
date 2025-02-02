// https://leetcode.cn/problems/count-complete-tree-nodes/description/

// 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
// 完全二叉树 的定义如下:
// 在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1 ~ 2h 个节点。

/**
 * @param {TreeNode} root
 * @return {number}
 */
// 利用完全二叉树的特点
// 时间复杂度O() 空间复杂度O()
var countNodes = function (root) {
	if (!root) return 0; // 终止条件1

	let left = root.left,
		leftDepth = 1;
	while (left) {
		leftDepth++;
		left = left.left;
	}

	let right = root.right,
		rightDepth = 1;
	while (right) {
		rightDepth++;
		right = right.right;
	}

	// 满二叉树子节点数量 2^n - 1 n为节点深度
	if (leftDepth == rightDepth) return Math.pow(2, leftDepth) - 1; // 终止条件2

	return countNodes(root.left) + countNodes(root.right) + 1;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
// DFS-后序遍历
// 时间复杂度O(n) 空间复杂度O(n)
var countNodes = function (root) {
	if (!root) return 0;
	return countNodes(root.left) + countNodes(root.right) + 1;
};
