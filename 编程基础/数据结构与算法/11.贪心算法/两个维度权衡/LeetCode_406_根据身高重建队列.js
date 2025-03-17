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
		if (a[0] !== b[0]) {
			return b[0] - a[0]; // 身高降序
		}
		return a[1] - b[1]; // k升序
	});

	// 2. 按照k为下标插入
	const result = [];
	for (const person of people) {
		result.splice(person[1], 0, person);
	}

	return result;
};
