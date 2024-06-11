// 节点
function TreeNode(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

// 二叉搜索树
function BinarySearchTree() {
	this.root = null;
}

// 查找节点
BinarySearchTree.prototype.find = function (num) {
	return _find(this.root, num);
	function _find(root, val) {
		if (!root || root.val === val) return root;
		if (val < root.val) return _find(root.left, val);
		if (val > root.val) return _find(root.right, val);
	}
};

// 添加节点
BinarySearchTree.prototype.insert = function (num) {
	this.root = _insert(this.root, num);
	function _insert(root, val) {
		if (!root) return new TreeNode(num);
		if (val < root.val) root.left = _insert(root.left, val);
		if (val > root.val) root.right = _insert(root.right, val);
		return root;
	}
};

// 删除节点
BinarySearchTree.prototype.delete = function (num) {
	_delete(this.root, val);
	function _delete(root, val) {
		if (!root) return root;
		if (val < root.val) {
			root.left = deleteNode(root.left, val);
			return root;
		} else if (val > root.val) {
			root.right = deleteNode(root.right, val);
			return root;
		} else if (val === root.val) {
			// 删除的节点是叶子节点或者节点只有[左子节点|右子节点]
			if (!root.left || !root.right) return root.left || root.right;
			// 删除的节点有两个子节点--找到该节点中序遍历的后继节点
			let next = cur.right;
			while (next.left) next = next.left;
			root.right = deleteNode(root.right, next.val);
			cur.val = next.val;
			return root;
		}
	}
};

// 中序遍历
BinarySearchTree.prototype.inorderTraversal = function (root, result = []) {
	return _inorderTraversal(this.root);
	function _inorderTraversal(root, result = []) {
		if (!root) return result;
		_inorderTraversal(root.left, result);
		result.push(root.val);
		_inorderTraversal(root.right, result);
		return result;
	}
};

const tree = new BinarySearchTree();
tree.insert(5);
tree.insert(3);
tree.insert(6);
tree.insert(2);
tree.insert(4);
tree.insert(7);
console.log(tree.find(4));
console.log(tree.inorderTraversal());
