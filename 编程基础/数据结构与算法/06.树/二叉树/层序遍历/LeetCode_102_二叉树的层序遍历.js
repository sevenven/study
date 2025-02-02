// https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
// 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// BFS解法
// 时间复杂度O(N) 空间复杂度O(n)
var levelOrder = function (root) {
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
		res.push(curLevel);
	}
	return res;
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// DFS解法
// 时间复杂度O(n) 空间复杂度O(n)
var levelOrder = function (root, level = 0, res = []) {
	if (!root) return res;
	if (!res[level]) res[level] = [];
	res[level].push(root.val);
	levelOrder(root.left, level + 1, res);
	levelOrder(root.right, level + 1, res);
	return res;
};
