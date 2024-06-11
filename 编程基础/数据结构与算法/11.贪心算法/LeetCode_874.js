// https://leetcode-cn.com/problems/walking-robot-simulation/

/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function (commands, obstacles) {
  var obstacleSet = new Set();
  for (obstacle of obstacles) {
    var ox = obstacle[0] + 30000;
    var oy = obstacle[1] + 30000;
    obstacleSet.add((ox << 16) + oy)
  }
  console.log(obstacleSet)
};

console.log(robotSim([4, -1, 4, -2, 4], [[2, 4]]));