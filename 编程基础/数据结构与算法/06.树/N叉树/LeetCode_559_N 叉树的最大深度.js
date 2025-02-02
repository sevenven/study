// https://leetcode.cn/problems/maximum-depth-of-n-ary-tree/description/

// 给定一个 N 叉树，找到其最大深度。
// 最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。

/**
 * @param {Node|null} root
 * @return {number}
 */
// DFS解法-后序遍历
// 时间复杂度O(n) 空间复杂度O(n)
var maxDepth = function (root) {
	if (!root) return 0;
	let depth = 0;
	for (child of root.children) depth = Math.max(depth, maxDepth(child));
	return depth + 1;
};

/**
 * @param {Node|null} root
 * @return {number}
 */
// BFS解法
// 时间复杂度O(n) 空间复杂度O(n)
var maxDepth = function (root) {
	if (!root) return 0;
	let queue = [root],
		depth = 0;
	while (queue.length) {
		const len = queue.length;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			for (let child of cur.children) queue.push(child);
		}
		depth++;
	}
	return depth;
};
