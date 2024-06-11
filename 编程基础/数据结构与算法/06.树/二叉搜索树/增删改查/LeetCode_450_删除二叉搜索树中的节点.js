// https://leetcode.cn/problems/delete-node-in-a-bst/description/

// 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。
// 返回二叉搜索树（有可能被更新）的根节点的引用。
// 一般来说，删除节点可分为两个步骤：
// 首先找到需要删除的节点；
// 如果找到了，删除它。

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
// 递归删除
var deleteNode = function (root, key) {
	if (!root) return root;
	if (key < root.val) {
		root.left = deleteNode(root.left, key);
		return root;
	} else if (key > root.val) {
		root.right = deleteNode(root.right, key);
		return root;
	} else if (key === root.val) {
		// 删除的节点是叶子节点或者节点只有[左子节点|右子节点]
		if (!root.left || !root.right) return root.left || root.right;
		// 删除的节点有两个子节点--找到该节点中序遍历的后继节点
		let next = cur.right;
		while (next.left) next = next.left;
		root.right = deleteNode(root.right, next.val);
		cur.val = next.val;
		return root;
	}
};

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
// 迭代删除
var deleteNode = function (root, key) {
	let cur = root,
		prev = null;
	while (cur) {
		if (key < cur.val) [prev, cur] = [cur, cur.left];
		else if (key > cur.val) [prev, cur] = [cur, cur.right];
		else break;
	}
	// 没有找到要删的节点
	if (!cur) return root;
	// 删除的节点是叶子节点或者节点只有[左子节点|右子节点]
	if (!cur.left || !cur.right) {
		if (!prev) {
			root = cur.left || cur.right;
		} else {
			if (cur === prev.left) prev.left = cur.left || cur.right;
			else prev.right = cur.left || cur.right;
		}
	} else {
		// 删除的节点有两个子节点--找到该节点中序遍历的后继节点
		let next = cur.right;
		while (next.left) next = next.left;
		deleteNode(cur, next.val);
		cur.val = next.val;
	}
	return root;
};
