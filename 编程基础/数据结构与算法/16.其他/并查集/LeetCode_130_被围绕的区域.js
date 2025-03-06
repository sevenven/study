// https://leetcode-cn.com/problems/surrounded-regions/

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
	if (!board || !board.length) return board;
	var n = board.length,
		m = board[0].length,
		dx = [-1, 1, 0, 0],
		dy = [0, 0, -1, 1],
		union = new UnionFind(n * m);
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < m; j++) {
			if (board[i][j] == 'O') {
				if (i === 0 || i === n - 1 || j === 0 || j === m - 1) {
					union.union(i * m + j, n * m);
				} else {
					for (var k = 0; k < 4; k++) {
						if (board[i + dx[k]][j + dy[k]] == 'O') union.union(i * m + j, (i + dx[k]) * m + (j + dy[k]));
					}
				}
			}
		}
	}
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < m; j++) {
			if (board[i][j] == 'O' && union.find(i * m + j) !== m * n) board[i][j] = 'X';
		}
	}
};

// 并查集
function UnionFind(n) {
	this.parent = [];
	for (var i = 0; i <= n; i++) this.parent[i] = i;
}

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
	if (rootI > rootJ) this.parent[rootJ] = rootI;
	else this.parent[rootI] = rootJ;
};

var arr = [
	['X', 'X', 'X', 'X'],
	['X', 'O', 'O', 'X'],
	['X', 'X', 'O', 'X'],
	['X', 'O', 'X', 'X']
];
solve(arr);
console.log(arr);
