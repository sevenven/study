// https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/
// 给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。

/**
 * @param {Node} root
 * @return {number[][]}
 */
// BFS解法
// 时间复杂度O(n) 空间复杂度O(n)
var levelOrder = function (root) {
	if (!root) return [];
	let queue = [root],
		result = [];
	while (queue.length) {
		const curLevel = [],
			len = queue.length;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			curLevel.push(cur.val);
			for (let child of cur.children) queue.push(child);
		}
		result.push(curLevel);
	}
	return result;
};

/**
 * @param {Node} root
 * @return {number[][]}
 */
// DFS解法
// 时间复杂度O(n) 空间复杂度O(logn)
var levelOrder = function (root, level = 0, result = []) {
	if (!root) return result;
	if (!result[level]) result[level] = [];
	result[level].push(root.val);
	for (let child of root.children) levelOrder(child, level + 1, result);
	return result;
};
