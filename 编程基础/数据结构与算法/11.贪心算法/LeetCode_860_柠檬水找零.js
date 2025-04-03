// https://leetcode-cn.com/problems/lemonade-change/
// 在柠檬水摊上，每一杯柠檬水的售价为 5 美元。顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。
// 每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零。
// 注意，一开始你手头没有任何零钱。
// 给你一个整数数组 bills ，其中 bills[i] 是第 i 位顾客付的账。如果你能给每位顾客正确找零，返回 true ，否则返回 false 。

/**
 * @param {number[]} bills
 * @return {boolean}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var lemonadeChange = function (bills) {
	var five = 0, // 5美元的数量
		ten = 0; // 10美元的数量
	for (bill of bills) {
		if (bill === 5) {
			// 收到5美元
			five++;
		} else if (bill === 10) {
			// 收到10美元
			if (five <= 0) return false;
			five--;
			ten++;
		} else {
			// 收到20美元
			if (ten > 0 && five > 0) {
				// 优先使用10+5组合
				ten--;
				five--;
			} else if (five >= 3) {
				// 其次使用5+5+5组合
				five -= 3;
			} else {
				return false;
			}
		}
	}
	return true;
};

// 测试用例
const testCases = [
	{
		bills: [5, 5, 5, 10, 20], // 正常情况，应该返回 true
		expected: true
	},
	{
		bills: [5, 5, 10, 10, 20], // 没有足够的5美元，应该返回 false
		expected: false
	},
	{
		bills: [10, 10], // 一开始就没有5美元找零，应该返回 false
		expected: false
	},
	{
		bills: [5, 5, 10, 20, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 5, 5, 20, 5, 20, 5], // 复杂情况，应该返回 true
		expected: true
	}
];

// 运行测试
testCases.forEach((test, index) => {
	const result = lemonadeChange(test.bills);
	console.log(`测试用例 ${index + 1}:`);
	console.log(`输入: [${test.bills.join(',')}]`);
	console.log(`预期输出: ${test.expected}`);
	console.log(`实际输出: ${result}`);
	console.log(`结果: ${result === test.expected ? '通过' : '失败'}`);
	console.log('------------------------');
});
