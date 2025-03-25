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

		// 当前累计剩余油量小于0
		if (curSum < 0) {
			start = i + 1; // 将起点设为下一个加油站
			curSum = 0; // 重置当前累计剩余油量
		}
	}

	return totalSum >= 0 ? start : -1;
};

// 测试用例
const testCases = [
	{
		gas: [1, 2, 3, 4, 5],
		cost: [3, 4, 5, 1, 2],
		expected: 3,
		description: '从位置3出发可以绕一圈'
	},
	{
		gas: [2, 3, 4],
		cost: [3, 4, 3],
		expected: -1,
		description: '无法绕一圈'
	},
	{
		gas: [5, 1, 2, 3, 4],
		cost: [4, 4, 1, 5, 1],
		expected: 4,
		description: '从位置4出发可以绕一圈'
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = canCompleteCircuit(test.gas, test.cost);
	console.log(`测试用例 ${index + 1}: ${test.description}`);
	console.log(`输入: gas = [${test.gas}], cost = [${test.cost}]`);
	console.log(`预期输出: ${test.expected}`);
	console.log(`实际输出: ${result}`);
	console.log(`结果: ${result === test.expected ? '通过' : '失败'}`);
	console.log('------------------------');
});
