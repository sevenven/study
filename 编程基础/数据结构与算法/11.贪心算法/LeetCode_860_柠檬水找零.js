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

console.log(lemonadeChange([5, 5, 5, 10, 20]));
console.log(lemonadeChange([5, 5, 10, 10, 20]));
