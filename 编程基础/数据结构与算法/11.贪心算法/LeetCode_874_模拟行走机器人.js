// https://leetcode-cn.com/problems/walking-robot-simulation/

/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function (commands, obstacles) {
	// 四个方向：北、东、南、西
	const dx = [0, 1, 0, -1];
	const dy = [1, 0, -1, 0];

	// 将障碍物转换为Set便于查找
	const obstacleSet = new Set(obstacles.map(([x, y]) => `${x},${y}`));

	let x = 0,
		y = 0; // 当前位置
	let dir = 0; // 当前方向（0-北，1-东，2-南，3-西）
	let maxDistance = 0; // 最大距离

	for (const command of commands) {
		if (command === -1) {
			// 向右转90度
			dir = (dir + 1) % 4;
		} else if (command === -2) {
			// 向左转90度
			dir = (dir + 3) % 4;
		} else {
			// 向当前方向移动
			for (let step = 0; step < command; step++) {
				const nextX = x + dx[dir];
				const nextY = y + dy[dir];

				// 如果下一步是障碍物，停止移动
				if (obstacleSet.has(`${nextX},${nextY}`)) {
					break;
				}

				x = nextX;
				y = nextY;
				// 更新最大距离
				maxDistance = Math.max(maxDistance, x * x + y * y);
			}
		}
	}

	return maxDistance;
};

console.log(robotSim([4, -1, 4, -2, 4], [[2, 4]]));
