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
		res = [];
	while (queue.length) {
		const curLevel = [],
			len = queue.length;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			curLevel.push(cur.val);
			for (let child of cur.children) queue.push(child);
		}
		res.push(curLevel);
	}
	return res;
};

/**
 * @param {Node} root
 * @return {number[][]}
 */
// DFS解法
// 时间复杂度O(n) 空间复杂度O(logn)
var levelOrder = function (root, level = 0, res = []) {
	if (!root) return res;
	if (!res[level]) res[level] = [];
	res[level].push(root.val);
	for (let child of root.children) levelOrder(child, level + 1, res);
	return res;
};
