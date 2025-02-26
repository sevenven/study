// https://leetcode.cn/problems/fruit-into-baskets/description/

// 你正在探访一家农场，农场从左到右种植了一排果树。这些树用一个整数数组 fruits 表示，其中 fruits[i] 是第 i 棵树上的水果种类。
// 你想要尽可能多地收集水果。然而，农场的主人设定了一些严格的规矩，你必须按照要求采摘水果：
// 你只有 两个 篮子，并且每个篮子只能装 单一类型 的水果。每个篮子能够装的水果总量没有限制。
// 你可以选择任意一棵树开始采摘，你必须从 每棵树（包括开始采摘的树）上恰好摘一个水果 。采摘的水果应当符合篮子中的水果类型。每采摘一次，你将会向右移动到下一棵树，并继续采摘。
// 一旦你走到某棵树前，但水果不符合篮子的水果类型，那么就必须停止采摘。
// 给你一个整数数组 fruits ，返回你可以收集的水果的 最大 数目。

/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
	let map = new Map(),
		L = 0,
		result = -Infinity;
	for (let R = 0; R < fruits.length; R++) {
		map.set(fruits[R], (map.get(fruits[R]) || 0) + 1);
		while (map.size > 2) {
			map.set(fruits[L], map.get(fruits[L]) - 1);
			if (map.get(fruits[L]) == 0) map.delete(fruits[L]);
			L++;
		}
		result = Math.max(result, R - L + 1);
	}
	return result;
};

console.log(totalFruit([1, 2, 1])); // 3
console.log(totalFruit([0, 1, 2, 2]));
console.log(totalFruit([1, 2, 3, 2, 2]));
console.log(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]));
