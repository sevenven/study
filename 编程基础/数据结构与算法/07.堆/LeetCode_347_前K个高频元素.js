// https://leetcode.cn/problems/top-k-frequent-elements/

// 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// Hash + 建立容量为k的小顶堆 时间复杂度O(nlogk) 空间复杂度O(k)
var topKFrequent = function (nums, k) {
	const map = new Map(),
		result = [];
	for (const num of nums) map.set(num, (map.get(num) || 0) + 1);
	const heap = new Heap((a, b) => a[1] - b[1]);
	for (const item of map) {
		heap.push(item);
		if (heap.size() > k) heap.pop();
	}
	while (heap.size()) result.push(heap.pop()[0]);
	return result;
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

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
