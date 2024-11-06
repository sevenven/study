// https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
// 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
// k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// 非递归解法
// 时间复杂度O(n) 空间复杂度O(1)
var reverseKGroup = function (head, k) {
	let _head = (prev = end = new ListNode(null, head)),
		start,
		_next;
	while (end) {
		for (let i = 0; i < k && end; i++) end = end.next;
		if (!end) break;
		[start, _next] = [prev.next, end.next];
		end.next = null;
		[prev.next, start.next, prev, end] = [reverseList(start), _next, start, start];
	}
	return _head.next;
};

function reverseList(head) {
	let prev = null,
		cur = head;
	while (cur) {
		[cur.next, prev, cur] = [prev, cur, cur.next];
	}
	return prev;
}

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
linkList.append(6);
linkList.append(7);

var result = reverseKGroup(linkList.head, 3);
console.log(result);
