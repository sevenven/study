// https://leetcode-cn.com/problems/binary-tree-cameras/
// 给定一个二叉树，我们在树的节点上安装摄像头。
// 节点上的每个摄影头都可以监视其父对象、自身及其直接子对象。
// 计算监控树的所有节点所需的最小摄像头数量。

// 二叉树节点定义
function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val;
	this.left = left === undefined ? null : left;
	this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root - 二叉树根节点
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(h)，h为树的高度
var minCameraCover = function (root) {};
