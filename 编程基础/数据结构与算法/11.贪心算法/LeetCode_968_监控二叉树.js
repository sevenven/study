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

// 测试用例
const testCases = [
	{
		description: '基本情况：只有根节点',
		tree: new TreeNode(0),
		expected: 1
	},
	{
		description: '简单树：一个父节点两个子节点',
		tree: (() => {
			const root = new TreeNode(0);
			root.left = new TreeNode(0);
			root.right = new TreeNode(0);
			return root;
		})(),
		expected: 1
	},
	{
		description: '链式结构：需要多个摄像头',
		tree: (() => {
			const root = new TreeNode(0);
			root.left = new TreeNode(0);
			root.left.left = new TreeNode(0);
			root.left.left.left = new TreeNode(0);
			return root;
		})(),
		expected: 2
	},
	{
		description: '完全二叉树：三层',
		tree: (() => {
			const root = new TreeNode(0);
			root.left = new TreeNode(0);
			root.right = new TreeNode(0);
			root.left.left = new TreeNode(0);
			root.left.right = new TreeNode(0);
			root.right.left = new TreeNode(0);
			root.right.right = new TreeNode(0);
			return root;
		})(),
		expected: 2
	},
	{
		description: '不平衡树：左侧较深',
		tree: (() => {
			const root = new TreeNode(0);
			root.left = new TreeNode(0);
			root.right = new TreeNode(0);
			root.left.left = new TreeNode(0);
			root.left.left.left = new TreeNode(0);
			return root;
		})(),
		expected: 2
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = minCameraCover(test.tree);
	console.log(`测试用例 ${index + 1}: ${test.description}`);
	console.log('预期输出:', test.expected);
	console.log('实际输出:', result);
	console.log('测试结果:', result === test.expected ? '通过' : '失败');
	console.log('------------------------');
});
