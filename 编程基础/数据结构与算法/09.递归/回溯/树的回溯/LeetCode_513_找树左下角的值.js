// https://leetcode.cn/problems/find-bottom-left-tree-value/description/

// 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。
// 假设二叉树中至少有一个节点。

/**
 * @param {TreeNode} root
 * @return {number}
 */
// DFS解法
// 时间复杂度O(n) 空间复杂度O(logn)
var findBottomLeftValue = function (root, curDepth = 1, global = { maxDepth: 0, nodeVal: undefined }) {
	if (!root.left && !root.right && curDepth > global.maxDepth) {
		global.maxDepth = curDepth;
		global.nodeVal = root.val;
		return global.nodeVal;
	}
	root.left && findBottomLeftValue(root.left, curDepth + 1, global);
	root.right && findBottomLeftValue(root.right, curDepth + 1, global);
	return global.nodeVal;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
// BFS解法
// 时间复杂度O(n) 空间复杂度O(n)
var findBottomLeftValue = function (root) {
	let queue = [root],
		result;
	while (queue.length) {
		let len = queue.length;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			if (i === 0) result = cur.val;
			cur.left && queue.push(cur.left);
			cur.right && queue.push(cur.right);
		}
	}
	return result;
};
