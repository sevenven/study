// https://leetcode.cn/problems/symmetric-tree/

// 给你一个二叉树的根节点 root ， 检查它是否轴对称。

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// DFS解法-后序遍历
// 时间复杂度O(n) 空间复杂度O(n)
var isSymmetric = function (root) {
	return isSame(root.left, root.right);
};

function isSame(left, right) {
	if (!left && !right) return true;
	if (!left || !right || left.val !== right.val) return false;
	return isSame(left.left, right.right) && isSame(left.right, right.left);
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// BFS解法
// 时间复杂度O(n) 空间复杂度O(n)
var isSymmetric = function (root) {
	let queue = [root.left, root.right],
		left,
		right;
	while (queue.length) {
		left = queue.shift();
		right = queue.shift();
		if (!left && !right) continue;
		if (!left || !right || left.val !== right.val) return false;
		queue = [...queue, left.left, right.right, left.right, right.left];
	}
	return true;
};
