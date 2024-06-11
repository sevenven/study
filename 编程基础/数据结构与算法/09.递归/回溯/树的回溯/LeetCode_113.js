// https://leetcode.cn/problems/path-sum-ii/

// 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
// 叶子节点 是指没有子节点的节点。

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
// 回溯 方式一
var pathSum = function (root, targetSum, path = [], result = []) {
  if (!root) return result;
  path.push(root.val);
  if (!root.left && !root.right && root.val === targetSum)
    result.push([...path]);
  pathSum(root.left, targetSum - root.val, path, result);
  pathSum(root.right, targetSum - root.val, path, result);
  path.pop();
  return result;
};

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
// 回溯 方式二
var pathSum = function (root, targetSum, path = [], result = []) {
  if (!root) return result;
  if (!root.left && !root.right && root.val === targetSum)
    result.push(path.concat(root.val));
  pathSum(root.left, targetSum - root.val, path.concat(root.val), result);
  pathSum(root.right, targetSum - root.val, path.concat(root.val), result);
  return result;
};
