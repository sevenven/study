// https://leetcode.cn/problems/remove-linked-list-elements/description/
// 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// 原链表删除元素
// 时间复杂度O(n) 空间复杂度O(1)
var removeElements = function (head, val) {
	while (head?.val === val) head = head.next;
	let cur = head;
	while (cur?.next) {
		if (cur.next.val === val) cur.next = cur.next.next;
		else cur = cur.next;
	}
	return head;
};

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// 使用虚拟头节点--删除节点方式统一
// 时间复杂度O(n) 空间复杂度O(1)
var removeElements = function (head, val) {
	let cur = (_head = new ListNode(null, head));
	while (cur?.next) {
		if (cur.next.val === val) cur.next = cur.next.next;
		else cur = cur.next;
	}
	return _head.next;
};
