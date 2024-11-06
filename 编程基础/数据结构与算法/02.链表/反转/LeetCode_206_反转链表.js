// https://leetcode-cn.com/problems/reverse-linked-list/
// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 指向前一个节点-循环
// 时间复杂度O(n) 空间复杂度O(1)
var reverseList = function (head) {
	let prev = null,
		cur = head;
	while (cur) {
		let temp = cur.next;
		cur.next = prev;
		prev = cur;
		cur = temp;
	}
	return prev;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 指向前一个节点-递归
// 时间复杂度O(n) 空间复杂度O(n)
var reverseList = function (cur, prev = null) {
	if (!cur) return prev;
	let temp = cur.next;
	cur.next = prev;
	reverseList(temp, cur);
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 头插法
// 时间复杂度O(n) 空间复杂度O(1)
var reverseList = function (head) {
	let _head = new ListNode(null),
		cur = head;
	while (cur) {
		[cur.next, _head.next, cur] = [_head.next, cur, cur.next];
	}
	return _head.next;
};

// 节点
function ListNode(val, next) {
	this.val = val;
	this.next = next || null;
}
// 链表
function LinkList() {
	this.head = null;
}
// 向链表节点末尾追加节点
LinkList.prototype.append = function (val) {
	var _new = new ListNode(val);
	if (!this.head) {
		this.head = _new;
		return;
	}
	var cur = this.head;
	while (cur.next) cur = cur.next;
	cur.next = _new;
};

var linkList = new LinkList();
linkList.append(1);
linkList.append(2);
linkList.append(3);
linkList.append(4);
linkList.append(5);

console.log(reverseList(linkList.head));
