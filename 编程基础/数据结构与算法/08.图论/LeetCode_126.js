// https://leetcode-cn.com/problems/word-ladder-ii/
// 按字典 wordList 完成从单词 beginWord 到单词 endWord 转化，一个表示此过程的 转换序列 是形式上像 beginWord -> s1 -> s2 -> ... -> sk 这样的单词序列，并满足：
// 每对相邻的单词之间仅有单个字母不同。
// 转换过程中的每个单词 si（1 <= i <= k）必须是字典 wordList 中的单词。注意，beginWord 不必是字典 wordList 中的单词。
// sk == endWord
// 给你两个单词 beginWord 和 endWord ，以及一个字典 wordList 。请你找出并返回所有从 beginWord 到 endWord 的 最短转换序列 ，如果不存在这样的转换序列，返回一个空列表。每个序列都应该以单词列表 [beginWord, s1, s2, ..., sk] 的形式返回。

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */

// BFS + DFS
var findLadders = function (beginWord, endWord, wordList) {
  var queue = [beginWord],
    words = [],
    wordSet = new Set(wordList),
    level = 1,
    levelMap = {},
    wordMap = {},
    result = [];
  levelMap[beginWord] = level;
  for (var i = 0; i < 26; i++) words.push(String.fromCharCode(97 + i));
  while (queue.length > 0) {
    var len = queue.length;
    level++;
    for (var i = 0; i < len; i++) {
      var cur = queue.shift();
      for (word of nextWord(cur, words, wordSet)) {
        if (!wordMap[word]) wordMap[word] = {};
        wordMap[word][cur] = true;
        if (levelMap[word] === undefined) {
          levelMap[word] = level;
          queue.push(word);
        }
      }
    }
  }
  dfs(result, [endWord], endWord, beginWord, wordMap, levelMap);
  return result;
};

function dfs(result, path, curWord, beginWord, wordMap, levelMap) {
  if (curWord === beginWord) result.push(path);
  for (word in wordMap[curWord]) {
    if (levelMap[word] + 1 === levelMap[curWord])
      dfs(result, [word].concat(path), word, beginWord, wordMap, levelMap);
  }
}

function nextWord(cur, words, wordSet) {
  var result = [];
  for (var j = 0; j < cur.length; j++) {
    for (var k = 0; k < words.length; k++) {
      if (cur[j] === words[k]) continue;
      var curChange = cur.slice(0, j) + words[k] + cur.slice(j + 1);
      if (wordSet.has(curChange)) result.push(curChange);
    }
  }
  return result;
}

console.log(
  findLadders("hit", "cog", [
    "hot",
    "dot",
    "dog",
    "lot",
    "log",
    "cog",
    "coi",
    "hpt",
  ])
);
// console.log(findLadders('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']));
// console.log(findLadders('a', 'c', ['a', 'b', 'c']));
