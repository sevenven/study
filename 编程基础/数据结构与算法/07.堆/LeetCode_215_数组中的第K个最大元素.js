// https://leetcode.cn/problems/kth-largest-element-in-an-array/

// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 暴力解法 时间复杂度O(n * k) 空间复杂度O(1)
var findKthLargest = function (nums, k) {
	let max;
	for (let i = 0; i < k; i++) {
		max = i;
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[max] < nums[j]) max = j;
		}
		[nums[i], nums[max]] = [nums[max], nums[i]];
	}
	return nums[k - 1];
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 排序 时间复杂度O(nlogn) 空间复杂度O(1)
var findKthLargest = function (nums, k) {
	nums.sort((a, b) => b - a);
	return nums[k - 1];
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 建立容量为k的小顶堆 时间复杂度O(nlogk) 空间复杂度O(k)
var findKthLargest = function (nums, k) {
	const heap = new Heap();
	for (const num of nums) {
		heap.push(num);
		if (heap.size() > k) heap.pop();
	}
	return heap.peek();
};

class Heap {
	constructor(compareFn) {
		// 使用数组存储堆
		this.heap = [];
		// 比较函数---默认小顶堆
		this.compareFn = compareFn || ((a, b) => a - b);
	}

	/* 元素入堆 */
	push(item) {
		// 添加节点
		this.heap.push(item);
		// 从底至顶堆化
		let cur = this.size() - 1;
		while (true) {
			let p = (cur - 1) >> 1;
			if (p < 0 || this.compareFn(this.heap[p], this.heap[cur]) < 0) break;
			[this.heap[p], this.heap[cur]] = [this.heap[cur], this.heap[p]];
			cur = p;
		}
	}

	/* 元素出堆 */
	pop() {
		// 判空处理
		if (!this.heap.length) throw new Error('堆为空');
		// 交换根节点与最右叶节点（交换首元素与尾元素）
		[this.heap[0], this.heap[this.size() - 1]] = [this.heap[this.size() - 1], this.heap[0]];
		// 删除节点
		const item = this.heap.pop();
		let cur = 0;
		// 从顶至底堆化
		while (true) {
			let min = cur,
				L = 2 * cur + 1,
				R = 2 * cur + 2;
			if (L < this.size() && this.compareFn(this.heap[L], this.heap[min]) < 0) min = L;
			if (R < this.size() && this.compareFn(this.heap[R], this.heap[min]) < 0) min = R;
			if (this.heap[cur] === this.heap[min]) break;
			[this.heap[cur], this.heap[min]] = [this.heap[min], this.heap[cur]];
			cur = min;
		}
		// 返回堆顶元素
		return item;
	}

	/* 访问堆顶元素 */
	peek() {
		return this.heap[0];
	}

	/* 获取堆的元素数量 */
	size() {
		return this.heap.length;
	}
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 快排写法1 时间复杂度O(nlogn) 空间复杂度O(logn)
var findKthLargest = function (nums, k, begin = 0, end = nums.length - 1) {
	if (begin >= end) return nums[k - 1];
	const pivot = partition(nums, begin, end);
	if (pivot === k - 1) {
		return nums[k - 1];
	} else if (pivot < k - 1) {
		return findKthLargest(nums, k, pivot + 1, end);
	} else {
		return findKthLargest(nums, k, begin, pivot - 1);
	}
};

function partition(nums, begin, end) {
	let pivot = end,
		point = begin;
	for (let i = begin; i < end; i++) {
		if (nums[i] >= nums[pivot]) {
			[nums[point++], nums[i]] = [nums[i], nums[point]];
		}
	}
	[nums[point], nums[pivot]] = [nums[pivot], nums[point]];
	return point;
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 快排写法2 时间复杂度O(nlogn) 空间复杂度O(logn)
var findKthLargest = function (nums, k, begin = 0, end = nums.length - 1) {
	if (begin >= end) return nums[k - 1];
	let L = begin,
		R = end;
	while (L < R) {
		while (L < R && nums[L] >= nums[end]) L++;
		while (L < R && nums[R] < nums[end]) R--;
		[nums[L], nums[R]] = [nums[R], nums[L]];
	}
	[nums[L], nums[end]] = [nums[end], nums[L]];
	if (L === k - 1) return nums[k - 1];
	else if (L < k - 1) return findKthLargest(nums, k, L + 1, end);
	else return findKthLargest(nums, k, 0, L - 1);
};

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
