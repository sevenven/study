// 给定一个长度为n的有序数组 nums 和一个元素 target ，数组不存在重复元素。
// 现将 target 插入数组 nums 中，并保持其有序性。
// 若数组中已存在元素 target ，则插入到其左方。请返回插入后 target 在数组中的索引

// 二分法查找思路
// 问题一：当数组中包含 target 时，插入点的索引是否是该元素的索引？
// 题目要求将 target 插入到相等元素的左边，这意味着新插入的 target 替换了原来 target 的位置。也就是说，当数组包含 target 时，插入点的索引就是该 target 的索引。

// 问题二：当数组中不存在 target 时，插入点是哪个元素的索引？
// 进一步思考二分查找过程：当 nums[mid] < target 时，L指针在向大于等于 target 的元素靠近。同理，nums[mid] > target R指针始终在向小于等于 target 的元素靠近。
// 因此二分结束时一定有：
// L指向首个大于 target 的元素，R指向首个小于 target 的元素。易得当数组不包含 target 时，插入索引为L

/* 二分查找插入点（无重复元素） */
function binarySearchInsertionSimple(nums, target) {
	let L = 0,
		R = nums.length - 1,
		mid;
	while (L <= R) {
		mid = L + ((R - L) >> 1);
		if (nums[mid] < target) L = mid + 1;
		else if (nums[mid] > target) R = mid - 1;
		else return mid;
	}
	return L;
}

console.log(binarySearchInsertionSimple([1, 3, 6, 8, 12, 15, 23, 26, 31, 35], 6)); // 2
console.log(binarySearchInsertionSimple([1, 3, 6, 8, 12, 15, 23, 26, 31, 35], 10)); // 4
console.log(binarySearchInsertionSimple([1, 3, 6, 8, 12, 15, 23, 26, 31, 35], -1)); // 0
console.log(binarySearchInsertionSimple([1, 3, 6, 8, 12, 15, 23, 26, 31, 35], 36)); // 10
