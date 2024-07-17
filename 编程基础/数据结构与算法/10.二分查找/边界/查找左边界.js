// 给定一个长度为n的有序整数数组nums，其中可能包含重复元素。请返回数组中最左一个元素target的索引。若数组中不包含该元素，则返回-1。

/* 二分查找最左一个 target */
function binarySearchLeftEdge(nums, target) {
	let L = 0,
		R = nums.length - 1,
		mid;
	while (L <= R) {
		mid = L + ((R - L) >> 1);
		if (nums[mid] < target) L = mid + 1;
		else if (nums[mid] > target) R = mid - 1;
		else R = mid - 1;
	}
	if (L === nums.length || nums[L] !== target) return -1;
	return L;
}

console.log(binarySearchLeftEdge([1, 3, 6, 6, 6, 8, 12, 12, 15, 23, 26, 31, 35], 6)); // 2
console.log(binarySearchLeftEdge([1, 3, 6, 6, 6, 8, 12, 12, 15, 23, 26, 31, 35], 10)); // -1
