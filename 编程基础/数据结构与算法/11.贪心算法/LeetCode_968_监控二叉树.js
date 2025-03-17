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
var minCameraCover = function (root) {
	let result = 0;

	// 节点状态：0: 未被覆盖 1: 已被覆盖 2: 已安装摄像头
	const traversal = node => {
		// 空节点默认为已覆盖状态
		if (!node) return 1;

		// 后序遍历
		const left = traversal(node.left);
		const right = traversal(node.right);

		// 情况1：左右子节点都已被覆盖
		if (left === 1 && right === 1) return 0; // 当前节点未被覆盖

		// 情况2：左右子节点至少有一个未被覆盖
		if (left === 0 || right === 0) {
			result++; // 安装摄像头
			return 2;
		}

		// 情况3：左右子节点至少有一个安装了摄像头
		if (left === 2 || right === 2) return 1; // 当前节点已被覆盖
	};

	// 处理根节点
	if (traversal(root) === 0) result++;

	return result;
};

// 示例1：
//     0
//    / \
//   0   0
const root1 = new TreeNode(0);
root1.left = new TreeNode(0);
root1.right = new TreeNode(0);
console.log(minCameraCover(root1)); // 输出：1

// 示例2：
//     0
//    /
//   0
//  /
// 0
const root2 = new TreeNode(0);
root2.left = new TreeNode(0);
root2.left.left = new TreeNode(0);
console.log(minCameraCover(root2)); // 输出：2
