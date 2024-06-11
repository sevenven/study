// https://leetcode.cn/problems/merge-k-sorted-lists/
// 给你一个链表数组，每个链表都已经按升序排列。
// 请你将所有链表合并到一个升序链表中，返回合并后的链表。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// 暴力求解
// 时间复杂度O(nlogn) 空间复杂度O(n)-暂存空间O(n)&输出空间O(n)
var mergeKLists = function (lists) {
	let head = (cur = new ListNode()),
		vals = [];
	// 时间复杂度O(n) 空间复杂度O(n)
	for (list of lists) {
		while (list) {
			vals.push(list.val);
			list = list.next;
		}
	}
	// 时间复杂度O(nlogn)
	vals.sort((a, b) => a - b);
	// 时间复杂度O(n) 空间复杂度O(n)
	for (val of vals) {
		cur.next = new ListNode(val);
		cur = cur.next;
	}
	return head.next;
};

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// 比较k个值进行合并
// 时间复杂度O(nk) 空间复杂度O(1)
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
	let _head = (cur = new ListNode(null)),
		minI = -1;
	while (true) {
		for (let i = 0; i < lists.length; i++) {
			if (!lists[i]) continue;
			if (lists[minI]?.val == undefined || lists[i].val < lists[minI].val) {
				minI = i;
			}
		}
		if (minI === -1) break;
		[cur.next, lists[minI]] = [lists[minI], lists[minI].next];
		[cur, minI] = [cur.next, -1];
	}
	return _head.next;
};

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// 优先队列存储k个值进行合并-使用LeetCode提供的PriorityQueue
// 时间复杂度O(nlogk) 空间复杂度O(1)
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
	let _head = (cur = new ListNode(null)),
		quequ = new PriorityQueue({ compare: (a, b) => a.value - b.value });
	for (list of lists) if (list) quequ.enqueue({ key: list, value: list.val });
	while (quequ.size()) {
		const { key } = quequ.dequeue();
		cur.next = key;
		cur = cur.next;
		key.next && quequ.enqueue({ key: key.next, value: key.next.val });
	}
	return _head.next;
};

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// 逐一两两合并链表
// 时间复杂度O(nk) 空间复杂度O(1): 暂存数据O(1)
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
	while (lists.length >= 2) {
		let _head = (cur = new ListNode()),
			list1 = lists.shift(),
			list2 = lists.shift();
		while (list1 && list2) {
			if (list1.val <= list2.val) [cur.next, list1] = [list1, list1.next];
			else [cur.next, list2] = [list2, list2.next];
			cur = cur.next;
		}
		cur.next = list1 || list2;
		lists.push(_head.next);
	}
	return lists[0] || null;
};

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// 分治合并链表
// 时间复杂度O(nlogk) 空间复杂度O(logk)-栈帧空间O(logk)
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists, L = 0, R = lists.length - 1) {
	if (L >= R) return lists[L] || null;
	const mid = (L + R) >> 1;
	return mergeTwoList(mergeKLists(lists, L, mid), mergeKLists(lists, mid + 1, R));
};

function mergeTwoList(list1, list2) {
	let _head = (cur = new ListNode());
	while (list1 && list2) {
		if (list1.val <= list2.val) [cur.next, list1] = [list1, list1.next];
		else [cur.next, list2] = [list2, list2.next];
		cur = cur.next;
	}
	cur.next = list1 || list2;
	return _head.next;
}
