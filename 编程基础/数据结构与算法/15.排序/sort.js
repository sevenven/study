// 常见排序算法实现
// https://www.cnblogs.com/onepixel/p/7674659.html

// 排序相关的一些概念
// 原地排序算法：特指空间复杂度是O(1)的排序算法
// 稳定排序算法：如果待排序序列中存在值相等的元素，经过排序后，相等元素之间原有的先后顺序不变
/* 有序度：数组中具有有序关系的元素对的个数
 * 满有序度：n * (n - 1) / 2
 * 逆序度：满有序度 - 有序度
 * 排序就是增加有序度 减少逆序度
 */

/* ------比较类排序：基于比较的排序 复杂度上限 O(nlogn)------ */

/* 交换排序 */

// 冒泡排序-每次查看相邻的元素 如果逆序 则交换
// 时间复杂度O(n^2) 空间复杂度O(1) 原地排序 稳定排序
function bubbleSort(arr) {
	let swapped = false;
	for (let i = 0; i < arr.length - 1; i++) {
		swapped = false;
		for (let j = 0; j < arr.length - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				swapped = true;
			}
		}
		if (!swapped) break;
	}
	console.log('bubbleSort--', arr);
}
bubbleSort([3, 44, 38, 5, 15, 46, 50, 28, 26, 36, 19, 4, 2, 47, 27]);

// 快速排序-先调配出左（比标杆小）右（比标杆大）子数组，然后对左右子数组进行排序
// 时间复杂度O(nlogn) 空间复杂度O(nlogn) 原地排序 不稳定排序
function quickSort(arr, begin, end) {
	// 分区写法1-快慢指针
	if (begin >= end) return;
	let point = begin;
	for (let i = begin; i < end; i++) {
		arr[i] <= arr[end] && ([arr[point++], arr[i]] = [arr[i], arr[point]]);
	}
	[arr[point], arr[end]] = [arr[end], arr[point]];
	quickSort(arr, begin, point - 1);
	quickSort(arr, point + 1, end);
	// 分区写法2-双指针
	// if (begin >= end) return;
	// let L = begin,
	// 	R = end;
	// while (L < R) {
	// 	while (L < R && arr[L] <= arr[end]) L++;
	// 	while (L < R && arr[R] > arr[end]) R--;
	// 	[arr[L], arr[R]] = [arr[R], arr[L]];
	// }
	// [arr[L], arr[end]] = [arr[end], arr[L]];
	// quickSort(arr, begin, L - 1);
	// quickSort(arr, L + 1, end);
}

quickSort((arr = [3, 44, 38, 5, 15, 46, 50, 28, 26, 36, 19, 4, 2, 47, 27]), 0, arr.length - 1);
console.log('quickSort--', arr);

/* 插入排序 */

// 简单插入排序-对于未排序数据 在已排序序列中从后向前扫描 找到相应位置并插入
// 时间复杂度O(n^2) 空间复杂度O(1) 原地排序 稳定排序
function insertionSort(arr) {
	for (let i = 1; i < arr.length; i++) {
		let j = i,
			cur = arr[i];
		while (j - 1 >= 0 && arr[j - 1] > cur) {
			arr[j] = arr[j - 1];
			j--;
		}
		arr[j] = cur;
	}
	console.log('insertionSort--', arr);
}
insertionSort([3, 44, 38, 5, 15, 46, 50, 28, 26, 36, 19, 4, 2, 47, 27]);

// 希尔排序-第一个突破O(n^2)的排序算法，是简单插入排序的改进版-缩小增量排序
// 时间复杂度O(n^1.3) 空间复杂度O(1) 原地排序 不稳定排序
function shellSort(arr) {
	for (let gap = arr.length >> 1; gap > 0; gap >>= 1) {
		for (let i = gap; i < arr.length; i++) {
			let j = i,
				cur = arr[i];
			while (j - gap >= 0 && arr[j - gap] > cur) {
				arr[j] = arr[j - gap];
				j = j - gap;
			}
			arr[j] = cur;
		}
	}
	console.log('shellSort--', arr);
}
shellSort([3, 44, 38, 5, 15, 46, 50, 28, 26, 36, 19, 4, 2, 47, 27]);

/* 选择排序 */

// 选择排序-每次找最小值 然后放到待排序数组的起始位置
// 时间复杂度O(n^2) 空间复杂度O(1) 原地排序 稳定排序
function selectionSort(arr) {
	let min;
	for (let i = 0; i < arr.length - 1; i++) {
		min = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[min] > arr[j]) min = j;
		}
		[arr[i], arr[min]] = [arr[min], arr[i]];
	}
	console.log('selectionSort--', arr);
}
selectionSort([3, 44, 38, 5, 15, 46, 50, 28, 26, 36, 19, 4, 2, 47, 27]);

// 堆排序
// 时间复杂度O(nlogn) 空间复杂度O(1) 原地排序 不稳定排序
function heapSort(arr) {
	// 建堆--从最后一个没有叶子节点的节点开始向前遍历
	for (let i = (arr.length - 2) >> 1; i >= 0; i--) heapify(arr, arr.length, i);
	// 排序 + 堆化
	for (let i = arr.length - 1; i >= 0; i--) {
		[arr[i], arr[0]] = [arr[0], arr[i]];
		heapify(arr, i, 0);
	}
	console.log('heapSort--', arr);
}
// 堆化
function heapify(arr, length, i) {
	let L = i * 2 + 1,
		R = i * 2 + 2,
		max = i;
	if (L < length && arr[L] > arr[max]) max = L;
	if (R < length && arr[R] > arr[max]) max = R;
	if (max != i) {
		[arr[max], arr[i]] = [arr[i], arr[max]];
		heapify(arr, length, max);
	}
}
heapSort([3, 44, 38, 5, 15, 46, 50, 28, 26, 36, 19, 4, 2, 47, 27]);

/* 归并排序 */

// 二路归并排序-先排序左右子数组 然后合并两个有序数组
// 时间复杂度O(nlogn) 空间复杂度O(n) 非原地排序 稳定排序
function mergeSort(arr, begin, end) {
	if (begin >= end) return; // 递归返回条件
	const mid = (begin + end) >> 1;
	// 分
	mergeSort(arr, begin, mid);
	mergeSort(arr, mid + 1, end);
	// 合
	let temp = Array(end - begin + 1),
		i = begin,
		j = mid + 1,
		k = 0;
	while (i <= mid && j <= end) temp[k++] = arr[i] < arr[j] ? arr[i++] : arr[j++];
	while (i <= mid) temp[k++] = arr[i++];
	while (j <= end) temp[k++] = arr[j++];
	for (let p = 0; p < temp.length; p++) arr[begin + p] = temp[p];
}

mergeSort((arr = [3, 44, 38, 5, 15, 46, 50, 28, 26, 36, 19, 4, 2, 47, 27]), 0, arr.length - 1);
console.log('mergeSort--', arr);

/* ------基于分类的排序 复杂度上限O(n) tips：对待排序数据有要求------ */

// 计数排序-example: 一个序列具有10^8个数，数值范围在[1, 1000]之间没需要对这个序列进行排序
// 时间复杂度O() 空间复杂度O()
function countingSort(arr, maxValue) {
	let bucket = new Array(maxValue + 1).fill(0),
		sortedI = 0;
	for (let i = 0; i < arr.length; i++) bucket[arr[i]]++;
	for (let i = 0; i < bucket.length; i++) {
		while (bucket[i]-- > 0) arr[sortedI++] = i;
	}
	console.log('countingSort--', arr);
}
countingSort([1, 3, 4, 5, 2, 4, 2, 3, 2, 4, 5, 1, 4, 3, 2, 5, 1, 3, 3, 3, 5, 1, 2, 4, 5], 5);

// 桶排序- 假设输入数据服从均匀分布，通过映射函数将序列分到有限数量的桶里 对每个桶进行单独排序 依次将各个桶中的值填充到arr中
// 时间复杂度O() 空间复杂度O()
function bucketSort(arr, bucketSize, fx) {
	let buckets = Array.from({ length: bucketSize }, () => []),
		k = 0;
	for (let i = 0; i < arr.length; i++) buckets[fx(arr[i])].push(arr[i]);
	for (bucket of buckets) {
		bucket.sort((a, b) => a - b);
		for (let i = 0; i < bucket.length; i++) arr[k++] = bucket[i];
	}
	console.log('bucketSort--', arr);
}
bucketSort([21, 3, 30, 44, 15, 36, 6, 10, 50, 9, 19, 25, 48, 5, 23, 47, 55, 51], 6, nums => Math.floor(nums / 10));

// 基数排序-将整数按位切割成不同的数字 然后分别比较每个位数
// 具体做法：将所有待比较数值统一为同样的数位长度，数位较短的数前面补0，然后从最低位开始，一次进行一次排序。从最低位排到最高位后就会变成一个有序数列
// 时间复杂度O() 空间复杂度O()
function radixSort(arr) {
	let max = Math.max(...arr),
		buckets = Array.from({ length: 10 }, () => []),
		count;
	for (let digit = 1; max / digit >= 1; digit *= 10) {
		for (num of arr) buckets[Math.floor(num / digit) % 10].push(num);
		count = 0;
		for (let i = 0; i < buckets.length; i++) {
			for (let num of buckets[i]) arr[count++] = num;
			buckets[i] = [];
		}
	}
	console.log('radixSort--', arr);
}
radixSort([144, 203, 6, 905, 47, 215, 836, 26, 527, 602, 1000]);
