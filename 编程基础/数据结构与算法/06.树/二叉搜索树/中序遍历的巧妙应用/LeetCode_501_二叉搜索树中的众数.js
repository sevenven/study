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
// 时间复杂度O(n) 空间复杂度O(h)
var findMode = function (root, result = [], global = { prev: null, count: 0, maxCount: 1 }) {
	if (!root) return null; // 基本情况：空节点直接返回

	// 递归遍历左子树
	findMode(root.left, result, global);

	// 统计当前节点值的频率
	if (global.prev?.val === root.val) {
		global.count++; // 如果当前节点值与前一个节点值相同，频率加 1
	} else {
		global.count = 1; // 否则重置频率为 1
	}

	// 更新结果数组
	if (global.count === global.maxCount) {
		result.push(root.val); // 如果当前频率等于最大频率，将当前节点值加入结果数组
	} else if (global.count > global.maxCount) {
		result.length = 0; // 如果当前频率大于最大频率，清空结果数组
		result.push(root.val); // 将当前节点值加入结果数组
		global.maxCount = global.count; // 更新最大频率
	}

	// 更新前一个节点
	global.prev = root;

	// 递归遍历右子树
	findMode(root.right, result, global);

	// 返回结果数组
	return result;
};
