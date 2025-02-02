// https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
// 给定一个二叉树，找出其最大深度。
// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
// 说明: 叶子节点是指没有子节点的节点。

/**
 * @param {TreeNode} root
 * @return {number}
 */
// DFS解法-后序遍历
// 时间复杂度O(n) 空间复杂度O(n)
var maxDepth = function (root) {
	if (!root) return 0;
	return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// BFS解法
// 时间复杂度O(N) 空间复杂度O(n)
var maxDepth = function (root) {
	if (!root) return [];
	let queue = [root],
		depth = 0;
	while (queue.length) {
		const len = queue.length;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			cur.left && queue.push(cur.left);
			cur.right && queue.push(cur.right);
		}
		depth++;
	}
	return depth;
};
