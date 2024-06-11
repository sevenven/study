// https://leetcode-cn.com/problems/isomorphic-strings/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  var obj = {};
  for (var i = 0; i < s.length; i++) {
    if (!obj['s'+s[i]]) obj['s'+s[i]] = t[i];
    if (!obj['t'+t[i]]) obj['t'+t[i]] = s[i];
    if ((s[i] !== obj['t'+t[i]]) || (t[i] !== obj['s'+s[i]])) return false;
  }
  return true;
};

console.log(isIsomorphic('egg', 'add')); // true
console.log(isIsomorphic('foo', 'bar')); // false