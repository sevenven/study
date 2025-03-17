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
var canCompleteCircuit = function (gas, cost) {
	let start = 0; // 起始位置
	let curSum = 0; // 当前累计剩余油量
	let totalSum = 0; // 总剩余油量

	for (let i = 0; i < gas.length; i++) {
		curSum += gas[i] - cost[i];
		totalSum += gas[i] - cost[i];

		if (curSum < 0) {
			// 当前累计剩余油量小于0
			start = i + 1; // 将起点设为下一个加油站
			curSum = 0; // 重置当前累计剩余油量
		}
	}

	return totalSum >= 0 ? start : -1;
};

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); // 3
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3])); // -1
