// https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/
// 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// BFS解法
// 时间复杂度O(n) 空间复杂度O(n)
var largestValues = function (root, level = 0, result = []) {
	if (!root) return [];
	const queue = [root],
		result = [];
	while (queue.length) {
		let levelMax = -Infinity,
			len = queue.length;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			levelMax = Math.max(levelMax, cur.val);
			cur.left && queue.push(cur.left);
			cur.right && queue.push(cur.right);
		}
		result.push(levelMax);
	}
	return result;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// DFS解法
// 时间复杂度O(n) 空间复杂度O(logn)
var largestValues = function (root, level = 0, result = []) {
	if (!root) return result;
	if (result[level] === undefined) result[level] = -Infinity;
	result[level] = Math.max(result[level], root.val);
	largestValues(root.left, level + 1, result);
	largestValues(root.right, level + 1, result);
	return result;
};
