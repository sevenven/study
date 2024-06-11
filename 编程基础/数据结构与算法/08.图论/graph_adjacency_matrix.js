/* 基于邻接矩阵实现的无向无权图类 */

class GraphAdjacencyMatrix {
	/* 构造函数 */
	constructor(vertices, edges) {
		this.vertices = []; // 顶点列表，元素代表“顶点值”，索引代表“顶点索引”
		this.adjMatrix = []; // 邻接矩阵，行列索引对应“顶点索引”
		// 添加顶点
		for (const val of vertices) this.addVertex(val);
		// 添加边
		for (const e of edges) this.addEdge(e[0], e[1]);
	}

	/* 添加顶点 */
	addVertex(val) {
		// 向顶点列表中添加新顶点的值
		this.vertices.push(val);
		// 在邻接矩阵中添加一行
		this.adjMatrix.push(Array(this.size() - 1).fill(0));
		// 在邻接矩阵中添加一列
		for (const row of this.adjMatrix) row.push(0);
	}

	/* 添加边--参数 i, j 对应 vertices 元素索引 */
	addEdge(i, j) {
		// 索引越界与相等处理
		if (i < 0 || j < 0 || i >= this.size() || j >= this.size() || i === j) throw new RangeError('Index Out Of Bounds Exception');
		// 在无向图中，邻接矩阵关于主对角线对称，即满足 (i, j) === (j, i)
		this.adjMatrix[i][j] = 1;
		this.adjMatrix[j][i] = 1;
	}

	/* 删除顶点 */
	removeVertex(index) {
		if (index >= this.size()) throw new RangeError('Index Out Of Bounds Exception');
		// 在顶点列表中移除索引 index 的顶点
		this.vertices.splice(index, 1);
		// 在邻接矩阵中删除索引 index 的行
		this.adjMatrix.splice(index, 1);
		// 在邻接矩阵中删除索引 index 的列
		for (const row of this.adjMatrix) row.splice(index, 1);
	}

	/* 删除边--参数 i, j 对应 vertices 元素索引 */
	removeEdge(i, j) {
		// 索引越界与相等处理
		if (i < 0 || j < 0 || i >= this.size() || j >= this.size() || i === j) throw new RangeError('Index Out Of Bounds Exception');
		this.adjMatrix[i][j] = 0;
		this.adjMatrix[j][i] = 0;
	}

	/* 获取顶点数量 */
	size() {
		return this.vertices.length;
	}

	/* 打印邻接矩阵 */
	print() {
		console.log('顶点列表 = ', this.vertices);
		console.log('邻接矩阵 =', this.adjMatrix);
	}
}

console.log('初始化');
const graphAdjMat = new GraphAdjacencyMatrix(
	[1, 3, 2, 4, 5],
	[
		[0, 1],
		[0, 3],
		[1, 2],
		[2, 3],
		[2, 4],
		[3, 4]
	]
);
graphAdjMat.print();

console.log('添加边');
graphAdjMat.addEdge(0, 2);
graphAdjMat.print();

console.log('删除边');
graphAdjMat.removeEdge(0, 1);
graphAdjMat.print();

console.log('添加顶点');
graphAdjMat.addVertex(6);
graphAdjMat.print();

console.log('删除顶点');
graphAdjMat.removeVertex(1);
graphAdjMat.print();
