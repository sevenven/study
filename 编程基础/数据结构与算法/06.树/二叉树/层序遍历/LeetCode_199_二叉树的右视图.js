// https://leetcode.cn/problems/binary-tree-right-side-view/

// 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// BFS解法
// 时间复杂度O(n) 空间复杂度O(n)
var rightSideView = function (root) {
	if (!root) return [];
	const queue = [root],
		result = [];
	while (queue.length) {
		const len = queue.length;
		for (let i = 0; i < len; i++) {
			cur = queue.shift();
			if (i === len - 1) result.push(cur.val);
			cur.left && queue.push(cur.left);
			cur.right && queue.push(cur.right);
		}
	}
	return result;
};

/**
 * @param {TreeNode} root
 * @return {number[]}x
 */
// DFS解法
// 时间复杂度O(n) 空间复杂度O(logn)
var rightSideView = function (root, level = 0, result = []) {
	if (!root) return result;
	if (result[level] === undefined) result.push(root.val);
	rightSideView(root.right, level + 1, result);
	rightSideView(root.left, level + 1, result);
	return result;
};
