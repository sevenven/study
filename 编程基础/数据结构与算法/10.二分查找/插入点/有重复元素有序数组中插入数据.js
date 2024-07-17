// 给定一个长度为n的有序数组 nums 和一个元素 target ，数组可能存在重复元素。
// 现将 target 插入数组 nums 中，并保持其有序性。
// 若数组中已存在元素 target ，则插入到其左方。请返回插入后 target 在数组中的索引

// 相比数组中无重复元素
// 假设数组中存在多个 target ，则普通二分查找只能返回其中一个 target 的索引，而无法确定该元素的左边和右边还有多少 target。
// 题目要求将目标元素插入到最左边，所以我们需要查找数组中最左一个 target 的索引

// 1.可考虑执行二分查找，得到任意一个 target 的索引K。从索引K开始，向左进行线性遍历，当找到最左边的 target 时返回。包含线性查找，因此渐进时间复杂度为O(n)。

// 2.扩展二分查找代码
// 当 nums[mid] < target 或 nums[mid] > target 时，说明还没有找 target，因此采用普通二分查找的缩小区间操作，从而使指针L和R向 target 靠近。
// 当 nums[mid] == target 时，说明小于 target 的元素在区间[L, mid - 1]中，因此采用R = mid - 1来缩小区间，从而使指针向小于 target 的元素靠近。
// 循环完成后，L指向最左边的target ，R指向首个小于 target 的元素，因此索引L是插入点。

/* 二分查找插入点（存在重复元素） */
function binarySearchInsertion(nums, target) {
	let L = 0,
		R = nums.length - 1,
		mid;
	while (L <= R) {
		mid = L + ((R - L) >> 1);
		if (nums[mid] < target) L = mid + 1;
		else if (nums[mid] > target) R = mid - 1;
		else R = mid - 1;
	}
	return L;
}

console.log(binarySearchInsertion([1, 3, 6, 6, 6, 8, 12, 12, 15, 23, 26, 31, 35], 6)); // 2
console.log(binarySearchInsertion([1, 3, 6, 6, 6, 8, 12, 12, 15, 23, 26, 31, 35], 10)); // 6
console.log(binarySearchInsertion([1, 3, 6, 6, 6, 8, 12, 12, 15, 23, 26, 31, 35], 36)); // 13
console.log(binarySearchInsertion([1, 3, 6, 6, 6, 8, 12, 12, 15, 23, 26, 31, 35], -1)); // 0
