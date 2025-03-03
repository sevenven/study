// https://leetcode-cn.com/problems/task-scheduler/

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
// 排序+贪心
// 时间复杂度O(t) 空间复杂度O(1)
var leastInterval = function(tasks, n) {
  var taskNum = new Array(26).fill(0),
      time = 0;
  for (task of tasks) {
    taskNum[task.charCodeAt()-65] += 1;
  }
  taskNum.sort(function (a, b) {return b - a});
  while (taskNum[0] > 0) {
    var i = 0;
    while (i <= n) {
      if (taskNum[0] === 0) break;
      if (taskNum[i] > 0) 
        taskNum[i]--;
      time++;
      i++;
    }
    taskNum.sort(function (a, b) {return b - a});
  }
  return time;
};

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
// 填充空余时间法
// 时间复杂度O(n) 空间复杂度O(1)
var leastInterval = function(tasks, n) {
  var taskNum = new Array(26).fill(0),
      maxTask = 0,
      freeTime = 0;
  for (task of tasks) {
    taskNum[task.charCodeAt()-65] += 1;
  }
  taskNum.sort(function (a, b) { return b - a});
  maxTask = taskNum[0];
  freeTime = (maxTask - 1) * n;
  for (var i = 1; i <= 25 && taskNum[i] > 0; i++) {
    freeTime -= Math.min(taskNum[i], maxTask - 1);
  }
  return freeTime > 0 ? freeTime + tasks.length : tasks.length;
};

console.log(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 2)) // 8
console.log(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 50)) // 104
console.log(leastInterval(['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C'], 3)) // 11