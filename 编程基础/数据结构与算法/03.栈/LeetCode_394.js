// https://leetcode.cn/problems/decode-string/

// 给定一个经过编码的字符串，返回它解码后的字符串。
// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

/**
 * @param {string} str
 * @return {string}
 */
var decodeString = function (str) {
  const stack = [];
  for (s of str) {
    if (s !== "]") {
      stack.push(s);
      continue;
    }
    let subStr = "";
    while (stack.top() !== "[") {
      subStr = stack.pop() + subStr;
    }
    stack.pop();
    let num = "";
    while (!isNaN(stack.top())) {
      num = stack.pop() + num;
    }
    stack.push(subStr.repeat(num * 1));
  }
  return stack.join("");
};

Array.prototype.top = function () {
  return this[this.length - 1];
};

console.log(decodeString("3[ab]12[bc]")); // "abababbcbcbcbcbcbcbcbcbcbcbcbc"
console.log(decodeString("3[a2[c]]")); // "accaccacc"
console.log(decodeString("2[abc]3[cd]ef")); // abcabccdcdcdef
console.log(decodeString("abc3[cd]xyz")); // abccdcdcdxyz
