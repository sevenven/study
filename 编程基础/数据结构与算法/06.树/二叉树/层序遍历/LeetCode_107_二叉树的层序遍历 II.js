// https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/description/

// 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// BFS解法
// 时间复杂度O(n) 空间复杂度O(n)
var levelOrderBottom = function (root) {
	if (!root) return [];
	const queue = [root],
		res = [];
	while (queue.length) {
		const curLevel = [],
			len = queue.length;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			curLevel.push(cur.val);
			cur.left && queue.push(cur.left);
			cur.right && queue.push(cur.right);
		}
		res.unshift(curLevel);
	}
	return res;
};
