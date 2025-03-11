// https://leetcode-cn.com/problems/minimum-genetic-mutation/
// 基因序列可以表示为一条由 8 个字符组成的字符串，其中每个字符都是 'A'、'C'、'G' 和 'T' 之一。
// 假设我们需要调查从基因序列 start 变为 end 所发生的基因变化。一次基因变化就意味着这个基因序列中的一个字符发生了变化。
// 例如，"AACCGGTT" --> "AACCGGTA" 就是一次基因变化。
// 另有一个基因库 bank 记录了所有有效的基因变化，只有基因库中的基因才是有效的基因序列。（变化后的基因必须位于基因库 bank 中）
// 给你两个基因序列 start 和 end ，以及一个基因库 bank ，请你找出并返回能够使 start 变化为 end 所需的最少变化次数。如果无法完成此基因变化，返回 -1 。
// 注意：起始基因序列 start 默认是有效的，但是它并不一定会出现在基因库中。

/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */

// 无向无权图单向BFS解法 在进入下一层的时候加1
// 时间复杂度O(mnk) 空间复杂度(1)
var minMutation = function (start, end, bank) {
  var queue = [start],
    level = 0,
    genes = ["A", "C", "G", "T"],
    bankSet = {};
  while (bank.length) {
    bankSet[bank.shift()] = true;
  }
  while (queue.length) {
    var len = queue.length;
    for (var i = 0; i < len; i++) {
      var cur = queue.shift();
      if (cur === end) return level;
      for (var j = 0; j < cur.length; j++) {
        for (var k = 0; k < genes.length; k++) {
          if (cur[j] !== genes[k]) {
            var curChange = cur.slice(0, j) + genes[k] + cur.slice(j + 1);
            if (bankSet[curChange]) {
              queue.push(curChange);
              delete bankSet[curChange];
            }
          }
        }
      }
    }
    level++;
  }
  return -1;
};
/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
// DFS解法
// var minMutation = function (start, end, bank) {
// };

console.log(minMutation("AACCGGTT", "AACCGGTA", ["AACCGGTA"])); // 1
console.log(
  minMutation("AACCGGTT", "AAACGGTA", ["AACCGGTA", "AACCGCTA", "AAACGGTA"])
); // 2
