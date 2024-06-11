// https://leetcode-cn.com/problems/counting-bits/

/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
	var arr = [];
	for (var i = 0; i <= num; i++) 
		arr.push(count(i));
	return arr;
};

function count(num) {
	var count = 0;
	while (num) {
		count++;
		num = num & (num - 1);
	}
	return count;
}

console.log(countBits(2)); // [0, 1, 1]
console.log(countBits(5)); // [0, 1, 1, 2, 1, 2]