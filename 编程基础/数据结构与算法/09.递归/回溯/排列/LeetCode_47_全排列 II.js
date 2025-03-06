// https://leetcode-cn.com/problems/permutations-ii/
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 回溯 + 剪枝解法
function permuteUnique(nums) {
	const result = [];
	nums.sort((a, b) => a - b); // 排序，方便跳过重复元素
	const used = new Array(nums.length).fill(false); // 记录元素是否被使用过

	function backtrack(path) {
		if (path.length === nums.length) {
			result.push([...path]); // 找到一个排列，加入结果
			return;
		}

		for (let i = 0; i < nums.length; i++) {
			// 如果当前元素已经被使用过，或者当前元素与前一个元素相同且前一个元素未被使用过，跳过
			if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])) continue;

			used[i] = true;
			path.push(nums[i]);
			backtrack(path);
			path.pop(); // 标准回溯
			used[i] = false; // 标准回溯
		}
	}

	backtrack([]);
	return result;
}

console.log(permuteUnique([3, 3, 0, 3])); // [[3, 3, 0, 3], [3, 3, 3, 0], [3, 0, 3, 3], [0, 3, 3, 3]]
