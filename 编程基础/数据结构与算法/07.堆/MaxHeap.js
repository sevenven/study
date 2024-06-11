/* 大顶堆 */
class MaxHead {
	constructor() {
		// 使用数组存储大顶堆
		this.maxHeap = [];
	}

	/* 元素入堆 */
	push(val) {
		// 添加节点
		this.maxHeap.push(val);
		// 从底至顶堆化
		this.siftUp(this.size() - 1);
	}

	/* 堆顶元素出堆 */
	pop() {
		// 判空处理
		if (this.isEmpty()) throw new Error('堆为空');
		// 交换根节点与最右叶节点（交换首元素与尾元素）
		[this.maxHeap[0], this.maxHeap[this.size() - 1]] = [this.maxHeap[this.size() - 1], this.maxHeap[0]];
		// 删除节点
		const val = this.maxHeap.pop();
		// 从顶至底堆化
		this.siftDown(0);
		// 返回堆顶元素
		return val;
	}

	/* 访问堆顶元素 */
	peek() {
		return this.maxHeap[0];
	}

	/* 获取堆的元素数量 */
	size() {
		return this.maxHeap.length;
	}

	/* 判断堆是否为空 */
	isEmpty() {
		return !this.maxHeap.length;
	}

	/* 从节点 i 开始，从底至顶堆化 */
	siftUp(i) {
		const p = MaxHead.parent(i);
		if (p >= 0 && this.maxHeap[p] < this.maxHeap[i]) {
			[this.maxHeap[p], this.maxHeap[i]] = [this.maxHeap[i], this.maxHeap[p]];
			this.siftUp(p);
		}
	}

	/* 从节点 i 开始，从顶至底堆化 */
	siftDown(i) {
		let max = i,
			L = MaxHead.left(i),
			R = MaxHead.right(i);
		if (L < this.size() && this.maxHeap[L] > this.maxHeap[max]) max = L;
		if (R < this.size() && this.maxHeap[R] > this.maxHeap[max]) max = R;
		if (max !== i) {
			[this.maxHeap[i], this.maxHeap[max]] = [this.maxHeap[max], this.maxHeap[i]];
			this.siftDown(max);
		}
	}

	/* 获取左子节点的索引 */
	static left(i) {
		return 2 * i + 1;
	}

	/* 获取右子节点的索引 */
	static right(i) {
		return 2 * i + 2;
	}

	/* 获取父节点的索引 */
	static parent(i) {
		return (i - 1) >> 1;
	}
}

const maxHeap = new MaxHead();

maxHeap.push(14);
maxHeap.push(10);
maxHeap.push(16);
maxHeap.push(8);
maxHeap.push(7);
maxHeap.push(2);
maxHeap.push(4);
maxHeap.push(1);
maxHeap.push(9);
maxHeap.push(3);

console.log(maxHeap.maxHeap);
console.log(maxHeap.size());
console.log(maxHeap.peek());
console.log(maxHeap.pop());
console.log(maxHeap.maxHeap);
console.log(maxHeap.pop());
console.log(maxHeap.maxHeap);
