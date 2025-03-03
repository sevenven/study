// https://leetcode.cn/problems/path-sum-iii/

// 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
// 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
// 回溯
var pathSum = function (root, targetSum) {
  if (!root) return 0;
  let sum = rootSum(root, targetSum);
  sum += pathSum(root.left, targetSum);
  sum += pathSum(root.right, targetSum);
  return sum;
};

function rootSum(root, targetSum) {
  let sum = 0;
  if (!root) return 0;
  if (root.val === targetSum) sum++;
  sum += rootSum(root.left, targetSum - root.val);
  sum += rootSum(root.right, targetSum - root.val);
  return sum;
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
// 前缀和 + 回溯
var pathSum = function (root, targetSum, presum = 0, map = new Map()) {
  if (!root) return 0;
  let sum = 0;
  map.set(presum, (map.get(presum) || 0) + 1);
  let curSum = presum + root.val;
  sum += map.get(curSum - targetSum) || 0;
  sum += pathSum(root.left, targetSum, curSum, map);
  sum += pathSum(root.right, targetSum, curSum, map);
  map.set(presum, map.get(presum) - 1);
  return sum;
};
