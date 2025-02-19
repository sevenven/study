// https://leetcode.cn/problems/insert-into-a-binary-search-tree/description/

// 给定二叉搜索树（BST）的根节点 root 和要插入树中的值 value ，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。
// 输入数据 保证 ，新值和原始二叉搜索树中的任意节点值都不同。

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
// 递归插入
var insertIntoBST = function (root, val) {
	if (!root) return new TreeNode(val); // 如果当前节点为空，说明找到了插入位置，创建一个新节点并返回
	if (val < root.val) root.left = insertIntoBST(root.left, val); // 如果插入的值小于当前节点的值，递归地在左子树中插入
	if (val > root.val) root.right = insertIntoBST(root.right, val); // 如果插入的值大于当前节点的值，递归地在右子树中插入
	// 返回当前节点（可能已经更新了左子树或右子树）
	return root;
};

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
// 迭代插入
var insertIntoBST = function (root, val) {
	let cur = root; // 定义一个指针 cur，初始指向根节点
	if (!cur) return new TreeNode(val); // 如果树为空（root 为 null），直接创建一个新节点并返回
	// 使用 while 循环找到插入位置
	while (cur) {
		if (val < cur.val) {
			// 如果插入的值小于当前节点的值
			if (!cur.left) break; // 如果当前节点的左子节点为空，说明找到了插入位置，退出循环
			cur = cur.left; // 否则，继续向左子树移动
		} else if (val > cur.val) {
			// 如果插入的值大于当前节点的值
			if (!cur.right) break; // 如果当前节点的右子节点为空，说明找到了插入位置，退出循环
			cur = cur.right; // 否则，继续向右子树移动
		}
	}
	// 根据插入的值与当前节点的值比较，插入到正确的位置
	if (val < cur.val) cur.left = new TreeNode(val); // 插入到左子节点
	if (val > cur.val) cur.right = new TreeNode(val); // 插入到右子节点
	// 返回根节点
	return root;
};
