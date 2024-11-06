// https://leetcode.cn/problems/add-two-numbers
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 非递归写法
// 时间复杂度O(n)|空间复杂度O(n)-输出空间O(n)-暂存数据O(1)
var addTwoNumbers = function (l1, l2) {
	let _head = (cur = new ListNode()),
		sum,
		rest = 0;
	while (l1 || l2 || rest) {
		sum = (l1?.val || 0) + (l2?.val || 0) + rest;
		cur.next = new ListNode(sum % 10);
		[rest, cur, l1, l2] = [Math.floor(sum / 10), cur.next, l1?.next, l2?.next];
	}
	return _head.next;
};

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 递归写法
// 时间复杂度O(n)|空间复杂度O(n)-输出空间O(n)-栈帧空间O(n)
var addTwoNumbers = function (l1, l2, rest = 0) {
	if (!l1 && !l2 && !rest) return null;
	const sum = (l1?.val || 0) + (l2?.val || 0) + rest;
	return new ListNode(sum % 10, addTwoNumbers(l1?.next, l2?.next, Math.floor(sum / 10)));
};
