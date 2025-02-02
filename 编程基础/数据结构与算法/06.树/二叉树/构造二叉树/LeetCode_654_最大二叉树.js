// https://leetcode.cn/problems/maximum-binary-tree/description/

// 给定一个不重复的整数数组 nums 。 最大二叉树 可以用下面的算法从 nums 递归地构建:

// 创建一个根节点，其值为 nums 中的最大值。
// 递归地在最大值 左边 的 子数组前缀上 构建左子树。
// 递归地在最大值 右边 的 子数组后缀上 构建右子树。
// 返回 nums 构建的 最大二叉树 。

// function TreeNode(val, left, right) {
// 	this.val = val === undefined ? 0 : val;
// 	this.left = left === undefined ? null : left;
// 	this.right = right === undefined ? null : right;
// }

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
	if (!nums.length) return null;
	let maxIndex = 0;
	for (let i = 1; i < nums.length; i++) maxIndex = nums[maxIndex] > nums[i] ? maxIndex : i;
	const node = new TreeNode(nums[maxIndex]);
	node.left = constructMaximumBinaryTree(nums.slice(0, maxIndex));
	node.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1));
	return node;
};

console.log(constructMaximumBinaryTree([3, 2, 1, 6, 0, 5]));
console.log(constructMaximumBinaryTree([3, 2, 1]));
