// https://leetcode.cn/problems/path-sum-iv/

// 对于一棵深度小于 5 的树，可以用一组三位十进制整数来表示。对于每个整数：
// 百位上的数字表示这个节点的深度 d，1 <= d <= 4。
// 十位上的数字表示这个节点在当前层所在的位置 P， 1 <= p <= 8。位置编号与一棵满二叉树的位置编号相同。
// 个位上的数字表示这个节点的权值 v，0 <= v <= 9。
// 给定一个包含三位整数的 升序 数组 nums ，表示一棵深度小于 5 的二叉树，请你返回 从根到所有叶子结点的路径之和 。
// 保证 给定的数组表示一个有效的连接二叉树。

/**
 * @param {number[]} nums
 * @return {number}
 */
var pathSum = function (nums) {
  const n = nums.length;
  const nodes = Array(n + 1);
  for (const num of nums) {
    let index =
      Math.pow(2, Math.floor(num / 100) - 1) + (Math.floor(num / 10) % 10) - 1;
    nodes[index] = num % 10;
  }
  let ans = 0;
  const dfs = (i, sum) => {
    if (nodes[i] === undefined) {
      return;
    }
    const val = nodes[i];
    const left = i << 1,
      right = left + 1;
    sum += val;
    if (nodes[left] == undefined && nodes[right] === undefined) {
      ans += sum;
      return;
    }
    dfs(left, sum);
    dfs(right, sum);
  };
  dfs(1, 0);
  return ans;
};
