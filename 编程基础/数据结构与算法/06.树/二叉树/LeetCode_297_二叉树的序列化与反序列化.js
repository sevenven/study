// https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/
// 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。
// 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
// 提示: 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。

// DFS
// 时间复杂度为 O(n) 空间复杂度为 O(n)
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
	return rserialize(root, '');
};

const rserialize = (root, str) => {
	if (!root) return str += 'None,';
	str += root.val + ',';
	str = rserialize(root.left, str);
	str = rserialize(root.right, str);
	return str;
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
	const dataList = data.split(',');
	return rdeserialize(dataList);
};

const rdeserialize = (dataList) => {
	if (dataList[0] === 'None') {
		dataList.shift();
		return null;
	}
	const root = new TreeNode(dataList[0] * 1);
	dataList.shift();
	root.left = rdeserialize(dataList);
	root.right = rdeserialize(dataList);
	return root;
}