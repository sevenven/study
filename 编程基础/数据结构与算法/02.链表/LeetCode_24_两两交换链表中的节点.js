// https://leetcode-cn.com/problems/swap-nodes-in-pairs/
// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 非递归解法
// 时间复杂度O(n) 空间复杂度O(1)
var swapPairs = function (head) {
	let _head = (prev = new ListNode(null, head)),
		first,
		second;
	while (prev?.next?.next) {
		[first, second] = [prev.next, prev.next.next];
		[prev.next, second.next, first.next, prev] = [second, first, second.next, first];
	}
	return _head.next;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 递归解法
// 时间复杂度O(n) 空间复杂度O(n)
var swapPairs = function (head) {
	if (!head?.next) return head;
	const second = head.next;
	[second.next, head.next] = [head, swapPairs(head.next.next)];
	return second;
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

var root = swapPairs(linkList.head);
console.log(root);
console.log(root.next.next.next);
