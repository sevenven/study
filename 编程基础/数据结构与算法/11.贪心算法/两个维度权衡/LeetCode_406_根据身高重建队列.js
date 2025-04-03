// https://leetcode.cn/problems/queue-reconstruction-by-height/
// 假设有打乱顺序的一群人站成一个队列，数组 people 表示队列中一些人的属性（不一定按顺序）。
// 每个 people[i] = [hi, ki] 表示第 i 个人的身高为 hi ，前面 正好 有 ki 个身高大于或等于 hi 的人。
// 请你重新构造并返回输入数组 people 所表示的队列。返回的队列应该格式化为数组 queue ，
// 其中 queue[j] = [hj, kj] 是队列中第 j 个人的属性（queue[0] 是排在队列前面的人）。

/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
	// 1. 按身高h降序、k升序排序
	people.sort((a, b) => {
		if (a[0] !== b[0]) return b[0] - a[0]; // 身高降序
		return a[1] - b[1]; // k升序
	});

	// 2. 按照k为下标插入
	const result = [];
	for (const person of people) {
		result.splice(person[1], 0, person);
	}

	return result;
};

// 测试用例
const testCases = [
	{
		// 测试用例1：包含相同身高的情况
		// [7,0]和[7,1]是相同身高，测试k值不同时的排序
		// [5,0]和[5,2]也是相同身高，验证k值对最终位置的影响
		people: [
			[7, 0],
			[4, 4],
			[7, 1],
			[5, 0],
			[6, 1],
			[5, 2]
		],
		expected: [
			[5, 0],
			[7, 0],
			[5, 2],
			[6, 1],
			[4, 4],
			[7, 1]
		]
	},
	{
		// 测试用例2：身高单调递减的情况
		// 每个人的身高都不相同，测试纯粹的身高排序
		// k值的分布验证了在身高不同时的插入位置计算
		people: [
			[6, 0],
			[5, 0],
			[4, 0],
			[3, 2],
			[2, 2],
			[1, 4]
		],
		expected: [
			[4, 0],
			[5, 0],
			[2, 2],
			[3, 2],
			[1, 4],
			[6, 0]
		]
	},
	{
		// 测试用例3：复杂场景测试
		// 包含多个相同身高的人([6,0]和[6,2])
		// 有较大的身高差([9,0]和[1,9])
		// k值分布广泛，从0到9
		// 测试算法在大规模复杂数据下的正确性
		people: [
			[9, 0],
			[7, 0],
			[1, 9],
			[3, 0],
			[2, 7],
			[5, 3],
			[6, 0],
			[3, 4],
			[6, 2],
			[5, 2]
		],
		expected: [
			[3, 0],
			[6, 0],
			[7, 0],
			[5, 2],
			[3, 4],
			[4, 4],
			[5, 3],
			[2, 7],
			[9, 0],
			[1, 9]
		]
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = reconstructQueue(test.people);
	console.log(`测试用例 ${index + 1}:`);
	console.log('输入:', test.people);
	console.log('预期输出:', test.expected);
	console.log('实际输出:', result);
	// 验证结果是否正确
	const isCorrect = JSON.stringify(result) === JSON.stringify(test.expected);
	console.log('结果:', isCorrect ? '通过' : '失败');
	console.log('------------------------');
});
