/* 基于邻接表实现的无向无权图类 */
class GraphAdjacencyList {
	/* 构造方法 */
	constructor(edges) {
		this.adjList = new Map();
		// 添加所有顶点和边
		for (const edge of edges) {
			this.addVertex(edge[0]);
			this.addVertex(edge[1]);
			this.addEdge(edge[0], edge[1]);
		}
	}

	/* 添加顶点 */
	addVertex(cur) {
		if (this.adjList.has(cur)) return;
		// 在邻接表中添加一个新链表
		this.adjList.set(cur, []);
	}

	/* 添加边 */
	addEdge(vet1, vet2) {
		if (!this.adjList.has(vet1) || !this.adjList.has(vet2) || vet1 === vet2) throw new Error('Illegal Argument Exception');
		// 添加边 vet1 - vet2
		this.adjList.get(vet1).push(vet2);
		this.adjList.get(vet2).push(vet1);
	}

	/* 删除顶点 */
	removeVertex(cur) {
		if (!this.adjList.has(cur)) throw new Error('Illegal Argument Exception');
		// 在邻接表中删除顶点 cur 对应的链表
		this.adjList.delete(cur);
		// 遍历其他顶点的链表，删除所有包含 cur 的边
		for (const list of this.adjList.values()) {
			const index = list.indexOf(cur);
			index > -1 && list.splice(index, 1);
		}
	}

	/* 删除边 */
	removeEdge(vet1, vet2) {
		if (!this.adjList.has(vet1) || !this.adjList.has(vet2) || vet1 === vet2) throw new Error('Illegal Argument Exception');
		// 删除边 vet1 - vet2
		const vet1List = this.adjList.get(vet1);
		const vet2List = this.adjList.get(vet2);
		vet1List.splice(vet1List.indexOf(vet2), 1);
		vet2List.splice(vet2List.indexOf(vet1), 1);
	}

	/* BFS */
	bfsSearch(vertex) {
		if (!vertex) return [];
		const queue = [vertex],
			result = [],
			visited = new Set().add(vertex); // 哈希表，用于记录已被访问过的顶点
		while (queue.length) {
			const len = queue.length;
			for (let i = 0; i < len; i++) {
				const cur = queue.shift(); // 队首顶点出队
				result.push(cur);
				// 遍历该顶点的所有邻接顶点
				for (const adjVertex of this.adjList.get(cur) || []) {
					if (visited.has(adjVertex)) continue; // 跳过已被访问的顶点
					queue.push(adjVertex); // 只入队未访问的顶点
					visited.add(adjVertex); // 标记该顶点已被访问
				}
			}
		}
		// 返回顶点遍历序列
		return result;
	}

	/* DFS */
	dfsSearch(vertex, visited = new Set(), result = []) {
		if (!vertex) return result;
		result.push(vertex);
		visited.add(vertex); // 标记该顶点已被访问
		for (const adjVertex of this.adjList.get(vertex)) {
			if (visited.has(adjVertex)) continue; // 跳过已被访问的顶点
			this.dfsSearch(adjVertex, visited, result); // 递归访问邻接顶点
		}
		return result;
	}

	/* 获取顶点数量 */
	size() {
		return this.adjList.size;
	}

	/* 打印邻接表 */
	print() {
		console.log('邻接表 =');
		for (const [key, value] of this.adjList) {
			console.log(key + ': ' + value);
		}
	}
}

// console.log('初始化');
const graphAdjList = new GraphAdjacencyList([
	[1, 3],
	[1, 5],
	[3, 2],
	[2, 5],
	[2, 4],
	[4, 5]
]);
graphAdjList.print();

// console.log('添加边');
graphAdjList.addEdge(1, 2);
// graphAdjList.print();

// console.log('删除边');
graphAdjList.removeEdge(1, 3);
// graphAdjList.print();

// console.log('添加顶点');
graphAdjList.addVertex(6);
// graphAdjList.print();

// console.log('删除顶点');
graphAdjList.removeVertex(3);
// graphAdjList.print();

// console.log('BFS');
// console.log(graphAdjList.bfsSearch(1));

// console.log('DFS');
// console.log(graphAdjList.dfsSearch(1));
