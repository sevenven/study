// https://leetcode.cn/problems/design-linked-list/
// 你可以选择使用单链表或者双链表，设计并实现自己的链表。

// 单链表中的节点应该具备两个属性：val 和 next 。val 是当前节点的值，next 是指向下一个节点的指针/引用。

// 如果是双向链表，则还需要属性 prev 以指示链表中的上一个节点。假设链表中的所有节点下标从 0 开始。

// 实现 MyLinkedList 类：

// MyLinkedList() 初始化 MyLinkedList 对象。
// int get(int index) 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1 。
// void addAtHead(int val) 将一个值为 val 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点。
// void addAtTail(int val) 将一个值为 val 的节点追加到链表中作为链表的最后一个元素。
// void addAtIndex(int index, int val) 将一个值为 val 的节点插入到链表中下标为 index 的节点之前。如果 index 等于链表的长度，那么该节点会被追加到链表的末尾。如果 index 比长度更大，该节点将 不会插入 到链表中。
// void deleteAtIndex(int index) 如果下标有效，则删除链表中下标为 index 的节点。

function ListNode(val, next) {
	this.val = val;
	this.next = next || null;
}

var MyLinkedList = function () {
	this._head = new ListNode();
	this.size = 0;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
	console.log(index, this.size);
	if (this.index < 0 || index >= this.size) return -1;

	let cur = this._head.next;
	while (index--) {
		cur = cur.next;
	}
	return cur.val;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
	const node = new ListNode(val);
	// [this._head.next, node.next] = [node, this._head.next];
	node.next = this._head.next;
	this._head.next = node;
	this.size++;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
	let node = new ListNode(val),
		cur = this._head;
	while (cur.next) cur = cur.next;
	cur.next = node;
	this.size++;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
	if (index > this.size) return;
	if (index === this.size) index = this.size;
	if (index < 0) index = 0;
	let node = new ListNode(val),
		cur = this._head;
	while (index--) cur = cur.next;
	if (cur.next) {
		node.next = cur.next;
		cur.next = node;
	} else cur.next = node;
	this.size++;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
	if (this.index < 0 || index >= this.size) return;
	let cur = this._head;
	while (index--) cur = cur.next;
	cur.next = cur.next.next;
	this.size--;
};

// 测试用例1
// var list = new MyLinkedList();
// console.log(list.addAtHead(1), list._head.next);
// console.log(list.addAtTail(3), list._head.next);
// console.log(list.addAtIndex(1, 2), list._head.next);
// console.log(list.get(1));
// console.log(list.deleteAtIndex(1), list._head.next);
// console.log(list.get(1));

// 测试用例2
var list = new MyLinkedList();
console.log(list.addAtHead(7), list._head.next);
console.log(list.addAtHead(2), list._head.next);
console.log(list.addAtHead(1), list._head.next);
console.log(list.addAtIndex(3, 0), list._head.next);
console.log(list.deleteAtIndex(2), list._head.next);
console.log(list.addAtHead(6), list._head.next);
console.log(list.addAtTail(4), list._head.next);
console.log(list.get(4));
console.log(list.addAtHead(4), list._head.next);
console.log(list.addAtIndex(5, 0), list._head.next);
console.log(list.addAtHead(6), list._head.next);
