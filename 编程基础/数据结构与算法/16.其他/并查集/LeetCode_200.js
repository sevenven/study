// https://leetcode-cn.com/problems/number-of-islands/

/**
 * @param {character[][]} grid
 * @return {number}
 */
// 时间复杂度O(n*m) 空间复杂度O(n*m)
var numIslands = function (grid) {
	if (!grid || !grid.length) return 0;
	var n = grid.length,
		m = grid[0].length,
		union = new UnionFind(grid);
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < m; j++) {
			if (grid[i][j] == 1) {
				grid[i][j] = 0;
				if (i - 1 >= 0 && grid[i - 1][j] == 1) union.union(i * m + j, (i - 1) * m + j);
				if (i + 1 < n && grid[i + 1][j] == 1) union.union(i * m + j, (i + 1) * m + j);
				if (j - 1 >= 0 && grid[i][j - 1] == 1) union.union(i * m + j, i * m + (j - 1));
				if (j + 1 < m && grid[i][j + 1] == 1) union.union(i * m + j, i * m + (j + 1));
			}
		}
	}
	return union.count;
};

// 并查集
function UnionFind(grid) {
	this.parent = [];
	this.count = 0;
	this.init(grid);
}

UnionFind.prototype.init = function (grid) {
	var n = grid.length,
		m = grid[0].length;
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < m; j++) {
			if (grid[i][j] === 1) {
				this.parent[i * m + j] = i * m + j;
				this.count++;
			}
		}
	}
};

UnionFind.prototype.find = function (i) {
	var root = i;
	while (this.parent[root] !== root) root = this.parent[root];
	while (this.parent[i] !== i) {
		var temp = i;
		i = this.parent[i];
		this.parent[temp] = root;
	}
	return root;
};

UnionFind.prototype.union = function (i, j) {
	var rootI = this.find(i),
		rootJ = this.find(j);
	if (rootI === rootJ) return;
	if (rootI < rootJ) this.parent[rootJ] = rootI;
	else this.parent[rootI] = rootJ;
	this.count--;
};

var result = numIslands([
	[1, 1, 1],
	[1, 0, 1],
	[1, 1, 1]
]);
console.log(result); // 1

var result = numIslands([
	[1, 1, 1, 0, 0],
	[1, 1, 0, 1, 0],
	[1, 1, 0, 1, 0],
	[0, 0, 0, 0, 0]
]);
console.log(result); // 2

var result = numIslands([
	[1, 1, 0, 0, 0],
	[1, 1, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 1, 1]
]);
console.log(result); // 3
