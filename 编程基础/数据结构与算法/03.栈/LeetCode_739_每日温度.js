// https://leetcode.cn/problems/daily-temperatures/
// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const stack = [],
    answer = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack.top()]) {
      const cur = stack.pop();
      answer[cur] = i - cur;
    }
    stack.push(i);
  }
  while (stack.length) {
    answer[stack.pop()] = 0;
  }
  return answer;
};

Array.prototype.top = function () {
  return this[this.length - 1];
};
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1, 1, 4, 2, 1, 1, 0, 0]
console.log(dailyTemperatures([30, 40, 50, 60])); // [1, 1, 1, 0];
console.log(dailyTemperatures([30, 60, 90])); // [1, 1, 0];
