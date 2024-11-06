// https://leetcode.cn/problems/palindrome-linked-list/
// 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

// _回文链表

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
	// 转换成数组
	let cur = head,
		arr = [];
	while (cur) {
		arr.push(cur.val);
		cur = cur.next;
	}
	// 数组双指针
	let L = 0,
		R = arr.length - 1;
	while (L < R) {
		if (arr[L] !== arr[R]) return false;
		L++;
		R--;
	}
	return true;
};

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
	let slow = (fast = head);
	// 链表分成两部分
	while (fast?.next) [slow, fast] = [slow.next, fast.next.next];
	// 翻转后半部分链表
	let prev = null,
		cur = slow;
	while (cur) [cur.next, prev, cur] = [prev, cur, cur.next];
	// 对比
	while (prev) {
		if (head.val !== prev.val) return false;
		else [head, prev] = [head.next, prev.next];
	}
	return true;
};
