// https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/
// 根据 逆波兰表示法，求表达式的值。
// 有效的算符包括 +、-、*、/ 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。
// 注意 两个整数之间的除法只保留整数部分。
// 可以保证给定的逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。

// 逆波兰表达式：
// 逆波兰表达式是一种后缀表达式，所谓后缀就是指算符写在后面。
// 平常使用的算式则是一种中缀表达式，如 ( 1 + 2 ) * ( 3 + 4 ) 。
// 该算式的逆波兰表达式写法为 ( ( 1 2 + ) ( 3 4 + ) * ) 。
// 逆波兰表达式主要有以下两个优点：
// 去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + * 也可以依据次序计算出正确结果。
// 适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const operator = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => Math.trunc(a / b),
    },
    stack = [];
  for (token of tokens) {
    if (!operator[token]) {
      stack.push(token);
    } else {
      let exp2 = stack.pop() * 1,
        exp1 = stack.pop() * 1;
      stack.push(operator[token](exp1, exp2));
    }
  }
  return stack.pop();
};

console.log(evalRPN(["2", "1", "+", "3", "*"])); // 9
console.log(evalRPN(["4", "13", "5", "/", "+"])); // 6
console.log(
  evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
); // 22
