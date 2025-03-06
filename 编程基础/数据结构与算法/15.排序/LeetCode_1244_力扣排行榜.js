// https://leetcode-cn.com/problems/design-a-leaderboard/

var Leaderboard = function () {
  this.board = {};
};

/** 
 * @param {number} playerId 
 * @param {number} score
 * @return {void}
 */
Leaderboard.prototype.addScore = function (playerId, score) {
  this.board[playerId] = this.board[playerId] ? this.board[playerId] + playerId : score;
};

/** 
 * @param {number} K
 * @return {number}
 */
Leaderboard.prototype.top = function (K) {
  var topK = 0,
    players = Object.keys(this.board),
    _this = this;
  players.sort(function (a, b) { return _this.board[b] - _this.board[a] });
  for (var i = 0; i < K; i++)
    topK += this.board[players[i]];
  return topK;
};

/** 
 * @param {number} playerId
 * @return {void}
 */
Leaderboard.prototype.reset = function (playerId) {
  this.board[playerId] = 0;
};

var board = new Leaderboard();
board.addScore('a', 100);
board.addScore('c', 80);
board.addScore('b', 90);
board.addScore('e', 60);
board.addScore('d', 70);
console.log(board.top(4));
board.reset('c');
console.log(board.top(4));