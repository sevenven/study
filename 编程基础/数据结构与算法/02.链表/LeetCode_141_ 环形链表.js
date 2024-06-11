// https://leetcode-cn.com/problems/linked-list-cycle/
// 给你一个链表的头节点 head ，判断链表中是否有环。

// function ListNode(val, next) {
//   this.val = val;
//   this.next = next || null;
// }

// LeetCode速度：1.哈希表 2.快慢指针法

/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 哈希表(使用ES6 Set) \
// 时间复杂度O(n) 空间复杂度O(n)
var hasCycle = function (head) {
	let cur = head,
		exits = new Set();
	while (cur) {
		if (exits.has(cur)) return true;
		exits.add(cur);
		cur = cur.next;
	}
	return false;
};

/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 快慢指针法
// 时间复杂度O(n) 空间复杂度O(1)
var hasCycle = function (head) {
	let slow = (fast = head);
	while (fast?.next) {
		fast = fast.next.next;
		slow = slow.next;
		if (fast === slow) return true;
	}
	return false;
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

var cur = linkList.head;
while (cur.next) {
	cur = cur.next;
}
cur.next = linkList.head;

var result = hasCycle(linkList.head);
console.log(result);
