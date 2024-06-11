// https://leetcode.cn/problems/intersection-of-two-linked-lists/
// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 哈希表
// 时间复杂度O(m + n) 空间复杂度O(n)
var getIntersectionNode = function (headA, headB) {
	let exits = new Set(),
		curA = headA,
		curB = headB;
	while (curA) {
		exits.add(curA);
		curA = curA.next;
	}
	while (curB) {
		if (exits.has(curB)) return curB;
		curB = curB.next;
	}
	return null;
};

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 消除两个链表长度差
// 时间复杂度O(m + n) 空间复杂度O(1);
var getIntersectionNode = function (headA, headB) {
	let curA = headA,
		curB = headB;
	while (curA !== curB) {
		curA = curA ? curA.next : headB;
		curB = curB ? curB.next : headA;
	}
	return curA;
};
