// https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
// 给你一个链表，删除链表的倒数第 n 个节点，并且返回链表的头节点。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// 时间复杂度O(n) 空间复杂度O(1)
var removeNthFromEnd = function (head, n) {
	let slow = (fast = head);
	for (let i = 0; i < n; i++) fast = fast.next;
	if (!fast) return head.next;
	while (fast.next) {
		[slow, fast] = [slow.next, fast.next];
	}
	slow.next = slow.next.next;
	return head;
};
