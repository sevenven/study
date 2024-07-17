// 给定一个长度为n的有序整数数组nums，其中可能包含重复元素。请返回数组中最右一个元素target的索引。若数组中不包含该元素，则返回-1。

/* 二分查找最左一个 target */
function binarySearchRightEdge(nums, target) {
	let L = 0,
		R = nums.length - 1,
		mid;
	while (L <= R) {
		mid = L + ((R - L) >> 1);
		if (nums[mid] < target + 1) L = mid + 1;
		else if (nums[mid] > target + 1) R = mid - 1;
		else R = mid - 1;
	}
	if (R === -1 || nums[R] !== target) return -1;
	return R;
}

console.log(binarySearchRightEdge([1, 3, 6, 6, 6, 8, 12, 12, 15, 23, 26, 31, 35], 6)); // 4
console.log(binarySearchRightEdge([1, 3, 6, 6, 6, 8, 12, 12, 15, 23, 26, 31, 35], 10)); // -1
