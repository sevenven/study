// https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
// 给定一个二叉树，找出其最小深度。
// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
// 说明：叶子节点是指没有子节点的节点。

/**
 * @param {TreeNode} root
 * @return {number}
 */
// DFS解法-前序遍历
// 时间复杂度O(n) 空间复杂度O(logn)
var minDepth = function (root) {
	if (!root) return 0;
	// 当 root 节点左右孩子有一个为空时，返回不为空的孩子节点的深度
	if (!root.left || !root.right) return Math.max(minDepth(root.left), minDepth(root.right)) + 1;
	return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
// BFS解法
// 时间复杂度O(N) 空间复杂度O(n)
var minDepth = function (root) {
	if (!root) return [];
	const queue = [root],
		depth = 0;
	while (queue.length) {
		const len = queue.length;
		depth++;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			if (!cur.left && !cur.right) return depth;
			cur.left && queue.push(cur.left);
			cur.right && queue.push(cur.right);
		}
	}
	return depth;
};
