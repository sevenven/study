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
		res = [];
	while (queue.length) {
		const len = queue.length;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			if (i === len - 1) res.push(cur.val);
			cur.left && queue.push(cur.left);
			cur.right && queue.push(cur.right);
		}
	}
	return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}x
 */
// DFS解法
// 时间复杂度O(n) 空间复杂度O(n)
var rightSideView = function (root, level = 0, res = []) {
	if (!root) return res;
	if (res[level] === undefined) res.push(root.val);
	rightSideView(root.right, level + 1, res);
	rightSideView(root.left, level + 1, res);
	return res;
};
