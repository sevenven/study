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
// 时间复杂度O(h) 空间复杂度O(h)
var deleteNode = function (root, key) {
	if (!root) return root; // 如果当前节点为空，直接返回 null
	// 如果要删除的值小于当前节点的值，递归地在左子树中删除
	if (key < root.val) {
		root.left = deleteNode(root.left, key);
		return root;
	} else if (key > root.val) {
		// 如果要删除的值大于当前节点的值，递归地在右子树中删除
		root.right = deleteNode(root.right, key);
		return root;
	} else if (key === root.val) {
		// 如果要删除的值等于当前节点的值
		// 情况 1：当前节点是叶子节点或只有一个子节点
		// 如果左子节点为空，返回右子节点；否则返回左子节点
		if (!root.left || !root.right) return root.left || root.right;
		// 情况 2：当前节点有两个子节点
		// 写法1-右子节点顶替当前节点 左子树放在右子树的最左边
		let next = root.right;
		while (next.left) next = next.left;
		next.left = root.left;
		return root.right;
		// 写法2
		// 找到当前节点中序遍历的后继节点（右子树中的最小节点）
		// let next = root.right;
		// while (next.left) next = next.left;
		// root.right = deleteNode(root.right, next.val); // 删除后继节点（因为后继节点的值会被移动到当前节点）
		// root.val = next.val; // 用后继节点的值替换当前节点的值
		// return root; // 返回当前节点
	}
};

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
// 迭代删除
// 时间复杂度O(h) 空间复杂度O(1)
var deleteNode = function (root, key) {
	// 定义两个指针：cur 用于遍历树，prev 用于记录 cur 的父节点
	let cur = root,
		prev = null;

	// 使用 while 循环查找要删除的节点
	while (cur) {
		if (key < cur.val) [prev, cur] = [cur, cur.left]; // 如果要删除的值小于当前节点的值，向左子树移动
		else if (key > cur.val) [prev, cur] = [cur, cur.right]; // 如果要删除的值大于当前节点的值，向右子树移动
		else break; // 如果找到要删除的节点，退出循环
	}

	if (!cur) return root; // 如果没有找到要删除的节点，直接返回根节点

	// 情况 1：要删除的节点是叶子节点或只有一个子节点
	if (!cur.left || !cur.right) {
		// 如果要删除的节点是根节点
		if (!prev) {
			root = cur.left || cur.right; // 将根节点更新为左子节点或右子节点
		} else {
			if (cur === prev.left) prev.left = cur.left || cur.right; // 如果要删除的节点是父节点的左子节点
			else prev.right = cur.left || cur.right; // 如果要删除的节点是父节点的右子节点
		}
	} else {
		// 情况 2：要删除的节点有两个子节点
		// 找到当前节点中序遍历的后继节点（右子树中的最小节点）
		let next = cur.right;
		while (next.left) next = next.left;
		// 删除后继节点（因为后继节点的值会被移动到当前节点）
		deleteNode(cur, next.val);
		cur.val = next.val; // 用后继节点的值替换当前节点的值
	}

	return root; // 返回更新后的根节点
};
