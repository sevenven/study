// https://leetcode-cn.com/problems/word-ladder/
// 字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列 beginWord -> s1 -> s2 -> ... -> sk：
// 每一对相邻的单词只差一个字母。
//  对于 1 <= i <= k 时，每个 si 都在 wordList 中。注意， beginWord 不需要在 wordList 中。
// sk == endWord
// 给你两个单词 beginWord 和 endWord 和一个字典 wordList ，返回 从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0 。

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
// 无向无权图单向BFS解法 在进入下一层的时候加1
// 时间复杂度O(mnk) 空间复杂度(1)
var ladderLength = function (beginWord, endWord, wordList) {
  var queue = [beginWord],
    words = [],
    wordSet = {},
    level = 1;
  while (wordList.length) wordSet[wordList.shift()] = true;
  for (var i = 0; i < 26; i++) words.push(String.fromCharCode(i + 97));
  while (queue.length > 0) {
    var len = queue.length;
    for (var i = 0; i < len; i++) {
      var cur = queue.shift();
      if (cur === endWord) return level;
      for (var j = 0; j < cur.length; j++) {
        for (var k = 0; k < words.length; k++) {
          if (cur[j] !== words[k]) {
            var curChange = cur.slice(0, j) + words[k] + cur.slice(j + 1);
            if (wordSet[curChange]) {
              queue.push(curChange);
              delete wordSet[curChange];
            }
          }
        }
      }
    }
    level++;
  }
  return 0;
};

console.log(ladderLength("hit", "cog", ["cog"])); // 0
console.log(ladderLength("hit", "hit", ["hit"])); // 1
console.log(ladderLength("a", "c", ["a", "b", "c"])); // 2
console.log(
  ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
); // 5
