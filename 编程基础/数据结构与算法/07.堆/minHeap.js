/* 小顶堆 */
class MinHead {
	constructor() {
		// 使用数组存储小顶堆
		this.minHead = [];
	}

	/* 元素入堆 */
	push(val) {
		// 添加节点
		this.minHead.push(val);
		// 从底至顶堆化
		this.siftUp(this.size() - 1);
	}

	/* 元素出堆 */
	pop() {
		// 判空处理
		if (this.isEmpty()) throw new Error('堆为空');
		// 交换根节点与最右叶节点（交换首元素与尾元素）
		[this.minHead[0], this.minHead[this.size() - 1]] = [this.minHead[this.size() - 1], this.minHead[0]];
		// 删除节点
		const val = this.minHead.pop();
		// 从顶至底堆化
		this.siftDown(0);
		// 返回堆顶元素
		return val;
	}

	/* 访问堆顶元素 */
	peek() {
		return this.minHead[0];
	}

	/* 获取堆的元素数量 */
	size() {
		return this.minHead.length;
	}

	/* 判断堆是否为空 */
	isEmpty() {
		return !this.minHead.length;
	}

	/* 从节点 i 开始，从底至顶堆化 */
	siftUp(i) {
		const p = MinHead.parent(i);
		if (p >= 0 && this.minHead[p] > this.minHead[i]) {
			[this.minHead[p], this.minHead[i]] = [this.minHead[i], this.minHead[p]];
			this.siftUp(p);
		}
	}

	/* 从节点 i 开始，从顶至底堆化 */
	siftDown(i) {
		let min = i,
			L = MinHead.left(i),
			R = MinHead.right(i);
		if (L < this.size() && this.minHead[L] < this.minHead[min]) min = L;
		if (R < this.size() && this.minHead[R] < this.minHead[min]) min = R;
		if (min !== i) {
			[this.minHead[i], this.minHead[min]] = [this.minHead[min], this.minHead[i]];
			this.siftDown(min);
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

const minHead = new MinHead();

minHead.push(14);
minHead.push(10);
minHead.push(16);
minHead.push(8);
minHead.push(7);
minHead.push(2);
minHead.push(4);
minHead.push(1);
minHead.push(9);
minHead.push(3);

console.log(minHead.minHead);
console.log(minHead.size());
console.log(minHead.peek());
console.log(minHead.pop());
console.log(minHead.minHead);
console.log(minHead.pop());
console.log(minHead.minHead);
