// https://leetcode-cn.com/problems/merge-two-sorted-lists/
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// 非递归写法 时间复杂度O(n) 空间复杂度O(1): 暂存数据O(1)
var mergeTwoLists = function (list1, list2) {
	let _head = (cur = new ListNode());
	while (list1 && list2) {
		if (list1.val <= list2.val) {
			[cur.next, list1] = [list1, list1.next];
		} else {
			[cur.next, list2] = [list2, list2.next];
		}
		cur = cur.next;
	}
	cur.next = list1 || list2;
	return _head.next;
};

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// 递归写法 时间复杂度O(n) 空间复杂度O(n): 栈帧空间O(n)
var mergeTwoLists = function (list1, list2) {
	if (!list1 || !list2) return list1 || list2;
	if (list1.val <= list2.val) {
		list1.next = mergeTwoLists(list1.next, list2);
		return list1;
	} else {
		list2.next = mergeTwoLists(list1, list2.next);
		return list2;
	}
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

var linkList1 = new LinkList();
linkList1.append(1);
linkList1.append(2);
linkList1.append(4);

var linkList2 = new LinkList();
linkList2.append(1);
linkList2.append(3);
linkList2.append(4);

var head = mergeTwoLists(linkList1.head, linkList2.head);
console.log(head);
console.log(head.next.next.next);
