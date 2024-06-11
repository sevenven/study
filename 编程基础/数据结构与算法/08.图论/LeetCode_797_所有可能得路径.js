// https://leetcode.cn/problems/all-paths-from-source-to-target/description/

// 给你一个有 n 个节点的 有向无环图（DAG），请你找出所有从节点 0 到节点 n-1 的路径并输出（不要求按特定顺序）
// graph[i] 是一个从节点 i 可以访问的所有节点的列表（即从节点 i 到节点 graph[i][j]存在一条有向边）。

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph, vertex = 0, path = [0], result = []) {
	if (vertex === graph.length - 1) {
		result.push([...path]);
		return;
	}
	for (adjVertex of graph[vertex]) {
		path.push(adjVertex);
		allPathsSourceTarget(graph, adjVertex, path, result);
		path.pop();
	}
	return result;
};

console.log(allPathsSourceTarget([[1, 2], [3], [3], []])); // [[0, 1, 3], [0, 2, 3]]
console.log(allPathsSourceTarget([[4, 3, 1], [3, 2, 4], [3], [4], []])); // [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]];
