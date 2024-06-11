// 中序表达式转后序表达式

// 1.数字直接放入后序表达式数组
// 2.遇到左括号直接入栈
// 3.遇到右括号 把栈顶元素弹出 直到遇到左括号 最后弹出左括号
// 4.遇到运算符 如果栈顶运算符优先级比较大 则弹出栈顶运算符

function infixExpToPostFixExp(infixExpArr) {
  const priority = { "+": 1, "-": 1, "*": 2, "/": 2 },
    stack = [],
    postFixExpArr = [];
  for (exp of infixExpArr) {
    if (!isNaN(exp)) {
      postFixExpArr.push(exp);
    } else if (exp === "(") {
      stack.push(exp);
    } else if (exp === ")") {
      while (stack.length > 0 && stack.top() !== "(") {
        postFixExpArr.push(stack.pop());
      }
      stack.pop();
    } else if (priority[exp]) {
      while (stack.length > 0 && priority[stack.top()] >= priority[exp]) {
        postFixExpArr.push(stack.pop());
      }
      stack.push(exp);
    }
  }
  while (stack.length > 0) {
    postFixExpArr.push(stack.pop());
  }
  return postFixExpArr;
}

Array.prototype.top = function () {
  return this[this.length - 1];
};

// 12+3
// ['12', '3', '+' ]
console.log(infixExpToPostFixExp(["12", "+", "3"]));
// 2-3+2
// ['2', '3', '-', '2', '+' ]
console.log(infixExpToPostFixExp(["2", "-", "3", "+", "2"]));
// (1+(4+5+3)-3)+(9+8)
// ['1', '4', '5', '+', '3', '+', '+', '3', '-', '9', '8', '+', '+' ]
var infixExpArr = [
  "(",
  "1",
  "+",
  "(",
  "4",
  "+",
  "5",
  "+",
  "3",
  ")",
  "-",
  "3",
  ")",
  "+",
  "(",
  "9",
  "+",
  "8",
  ")",
];
console.log(infixExpToPostFixExp(infixExpArr));
// (1+(4+5+3)/4-3)+(6+8)*3
// ['1', '4', '5', '+', '3', '+', '4', '/', '+', '3', '-', '6', '8', '+', '3', '*', '+' ]
var infixExpArr = [
  "(",
  "1",
  "+",
  "(",
  "4",
  "+",
  "5",
  "+",
  "3",
  ")",
  "/",
  "4",
  "-",
  "3",
  ")",
  "+",
  "(",
  "6",
  "+",
  "8",
  ")",
  "*",
  "3",
];
console.log(infixExpToPostFixExp(infixExpArr));
