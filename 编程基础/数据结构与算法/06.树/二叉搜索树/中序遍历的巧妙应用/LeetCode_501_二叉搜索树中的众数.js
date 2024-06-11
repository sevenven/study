// https://leetcode.cn/problems/find-mode-in-binary-search-tree/description/

const { count } = require('console');

// 给你一个含重复值的二叉搜索树（BST）的根节点 root ，找出并返回 BST 中的所有 众数（即，出现频率最高的元素）。
// 如果树中有不止一个众数，可以按 任意顺序 返回。
// 假定 BST 满足如下定义：
// 结点左子树中所含节点的值 小于等于 当前节点的值
// 结点右子树中所含节点的值 大于等于 当前节点的值
// 左子树和右子树都是二叉搜索树

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 回溯
var findMode = function (root, result = [], global = { prev: null, count: 0, maxCount: 1 }) {
	if (!root) return null;
	findMode(root.left, result, global);
	if (global.prev?.val === root.val) global.count++;
	else global.count = 1;
	if (global.count === global.maxCount) result.push(root.val);
	else if (global.count > global.maxCount) {
		result.length = 0;
		result.push(root.val);
		global.maxCount = global.count;
	}
	global.prev = root;
	findMode(root.right, result, global);
	return result;
};
