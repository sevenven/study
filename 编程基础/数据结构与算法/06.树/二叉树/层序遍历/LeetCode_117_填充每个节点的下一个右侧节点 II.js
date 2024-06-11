// https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii/description/
// 给定一个二叉树：

// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL 。

// 初始状态下，所有 next 指针都被设置为 NULL 。

/**
 * @param {Node} root
 * @return {Node}
 */
// BFS解法
// 时间复杂度O(N) 空间复杂度O(n)
var connect = function (root) {
	if (!root) return null;
	const queue = [root];
	while (queue.length) {
		const len = queue.length;
		for (let i = 0; i < len; i++) {
			const cur = queue.shift();
			if (i <= len - 2) cur.next = queue[0];
			cur.left && queue.push(cur.left);
			cur.right && queue.push(cur.right);
		}
	}
	return root;
};
