// https://leetcode-cn.com/problems/max-sum-of-rectangle-no-larger-than-k/

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
// 时间复杂度O(m^2 * n^2) 空间复杂度O(n)
function maxSumSubmatrix (matrix, k) {
  var n = matrix.length, // 行
    m = matrix[0].length, // 列
    max = -Infinity;
  for (var l = 0; l < m; l++) {
    var rowSum = new Array(n).fill(0);
    for (var r= l; r < m; r++) {
      for (var i = 0; i < n; i++) {
        rowSum[i] += matrix[i][r];
      }
      for (var i = 0; i < n; i++) {
        var cur = 0;
        for (var j = i; j < n; j++) {
          cur += rowSum[j];
          if (cur > max && cur <= k) 
            max = cur;
        }
      }      
    }
  }
  return max;
}

// function binarySearch (arr, target){
//   var left = 0,
//       right = arr.length - 1;
//   while (left <= right) {
//     var mid = (left + right) >> 1;
//     if (arr[mid] === target) 
//         return mid;
//     else if (arr[mid] < target) 
//       left = mid + 1;
//     else 
//       right = mid - 1;
//   }
//   return left;
// }

console.log(maxSumSubmatrix([[1, 0, 1], [0, -2, 3]], 2)); // 2