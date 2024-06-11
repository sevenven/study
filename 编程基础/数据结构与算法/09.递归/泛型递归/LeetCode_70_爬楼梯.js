// https://leetcode-cn.com/problems/climbing-stairs/
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

/**
 * @param {number} n
 * @return {number}
 */
// 暴力递归法 时间复杂度O(2^n) 空间复杂度O(n)
var climbStairs = function (n) {
	if (n <= 2) return n;
	return climbStairs(n - 1) + climbStairs(n - 2);
};

/**
 * @param {number} n
 * @return {number}
 */
// 暴力递归法的时间复杂度太高了 可以进行优化 缓存已经计算过的结果
// 此时，时间复杂度O(n) 空间复杂度O(n)
var climbStairs = function (n, caches = [0, 1, 2]) {
	if (caches[n]) return caches[n];
	return (caches[n] = climbStairs(n - 1, caches) + climbStairs(n - 2, caches));
};

console.log(climbStairs(10)); // 89;
