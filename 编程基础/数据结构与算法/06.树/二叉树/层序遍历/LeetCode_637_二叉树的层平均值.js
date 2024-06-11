// https://leetcode.cn/problems/average-of-levels-in-binary-tree/description/
// 给定一个非空二叉树的根节点 root , 以数组的形式返回每一层节点的平均值。与实际答案相差 10^-5 以内的答案可以被接受。

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// BFS解法
// 时间复杂度O(N) 空间复杂度O(n)
var averageOfLevels = function (root) {
	if (!root) return [];
	const queue = [root],
		result = [];
	while (queue.length) {
		let levenSum = 0,
			len = queue.length;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			levenSum += cur.val;
			cur.left && queue.push(cur.left);
			cur.right && queue.push(cur.right);
		}
		result.push(levenSum / len);
	}
	return result;
};
