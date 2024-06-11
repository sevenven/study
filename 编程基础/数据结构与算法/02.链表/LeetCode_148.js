// https://leetcode.cn/problems/sort-list/
// 给你链表的头节点 head ，请将其按 升序 排列并返回 排序后的链表 。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }
// _ 排序链表

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 时间复杂度O(nlogn)
var sortList = function (head) {
	if (!head?.next) return head;
	const [left, right] = split(head);
	return merge(sortList(left), sortList(right));
};

function split(node) {
	let slow = (fast = node);
	while (fast?.next?.next) {
		[slow, fast] = [slow.next, fast.next.next];
	}
	const right = slow.next;
	slow.next = null;
	return [node, right];
}

function merge(left, right) {
	let _head = (cur = new ListNode());
	while (left && right) {
		if (left.val <= right.val) {
			[cur.next, left] = [left, left.next];
		} else {
			[cur.next, right] = [right, right.next];
		}
		cur = cur.next;
	}
	cur.next = left || right;
	return _head.next;
}
