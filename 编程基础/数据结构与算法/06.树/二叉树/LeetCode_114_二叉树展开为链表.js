// https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/

// 给你二叉树的根结点 root ，请你将它展开为一个单链表：

// 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
// 展开后的单链表应该与二叉树 先序遍历 顺序相同。

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
// 右->左->根遍历 再往前指
var flatten = function (root) {
	let prev = null;
	root && revPreOrder(root);
	function revPreOrder(root) {
		root.right && revPreOrder(root.right);
		root.left && revPreOrder(root.left);
		[root.left, root.right, prev] = [null, prev, root];
	}
};

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
	let cur = root,
		prev;
	while (cur) {
		if (cur.left) {
			prev = cur.left;
			while (prev.right) prev = prev.right;
			[prev.right, cur.right] = [cur.right, cur.left];
			cur.left = null;
			cur = cur.right;
		} else {
			cur = cur.right;
		}
	}
};
