// https://leetcode-cn.com/problems/gas-station/
// 在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
// 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。
// 你从其中的一个加油站出发，开始时油箱为空。
// 给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。
// 如果存在解，则保证它是唯一的。

/**
 * @param {number[]} gas - 加油站汽油数组
 * @param {number[]} cost - 到下一站消耗的汽油数组
 * @return {number}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var canCompleteCircuit = function (gas, cost) {};

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); // 3
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3])); // -1
