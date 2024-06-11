// 不带头节点的单链表
// 比较简易的实现 默认不往链表中添加值重复的元素 默认非环形链表

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
	const node = new ListNode(val);
	if (!this.head) {
		this.head = node;
		return;
	}
	let cur = this.head;
	while (cur.next) cur = cur.next;
	cur.next = node;
};

// 在指定元素后插入一个元素
LinkList.prototype.insert = function (val, newVal) {
	let node = new ListNode(newVal),
		cur = this.findByValue(val);
	if (cur === null) {
		console.log('未找到指定元素');
		return;
	}
	[node.next, cur.next] = [cur.next, node];
};

// 查找节点
LinkList.prototype.findByValue = function (val) {
	let cur = this.head;
	while (cur && cur.val != val) cur = cur.next;
	return cur;
};

// 访问节点
LinkList.prototype.findByIndex = function (index) {
	let cur = this.head,
		count = 0;
	while (cur && count !== index) {
		cur = cur.next;
		count++;
	}
	return cur;
};

// 查找前一个节点
LinkList.prototype.findpre = function (val) {
	let cur = this.head;
	while (cur.next && cur.next.val != val) cur = cur.next;
	return cur.next ? cur : null;
};

// 查找中间节点
LinkList.prototype.findMiddle = function () {
	var slow = this.head,
		fast = this.head;
	while (fast && fast.next) {
		fast = fast.next.next;
		slow = slow.next;
	}
	return slow;
};

// 查找倒数第n个节点---最后一个是倒数第一个
LinkList.prototype.findIndexFromEnd = function (n) {
	let slow = (fast = this.head);
	for (var i = 1; i < n; i++) fast = fast.next;
	while (fast && fast.next) {
		fast = fast.next;
		slow = slow.next;
	}
	return slow;
};

// 删除指定值的节点
LinkList.prototype.remove = function (val) {
	if (this.head.val === val) {
		this.head = this.head.next;
		return;
	}
	let prev = this.findpre(val);
	if (prev && prev.next) prev.next = prev.next.next;
};

// 删除指定index的节点
LinkList.prototype.removeIndex = function (index) {
	if (index === 0) {
		this.head = this.head.next;
		return;
	}
	const prev = this.findByIndex(index - 1);
	if (prev && prev.next) prev.next = prev.next.next;
};

// 删除倒数第n个节点---最后一个是倒数第一个
LinkList.prototype.removeIndexFromEnd = function (n) {
	let slow = (fast = head);
	for (let i = 0; i < n; i++) fast = fast.next;
	if (!fast) return head.next;
	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next;
	}
	slow.next = slow.next.next || null;
	return head;
};

// 打印整个链表
LinkList.prototype.print = function () {
	let cur = this.head;
	while (cur) {
		console.log(cur.val);
		cur = cur.next;
	}
};

// 反转链表
LinkList.prototype.reverseList = function () {
	let cur = this.head,
		prev = null;
	while (cur) {
		[cur.next, prev, cur] = [prev, cur, cur.next];
	}
	return prev;
};

// 检测链表是否是环形链表
LinkList.prototype.checkCircle = function () {
	var fast = this.head,
		slow = this.head;
	while (fast && fast.next) {
		fast = fast.next.next;
		slow = slow.next;
		if (fast === slow) return true;
	}
	return false;
};

// 判断链表是否为空
LinkList.prototype.isEmpty = function () {
	return this.head === null;
};

// 清空链表
LinkList.prototype.clear = function () {
	this.head = null;
};

var list = new LinkList();
list.append('zanzan');
list.append('bobo');
list.append('wangji');
list.insert('bobo', 'xianxian');
console.log(list.head);
console.log(list.findByValue('wangji').val, list.findByValue('yun'));
console.log(list.findByIndex(1).val, list.findByValue(5));
console.log(list.findpre('bobo').val);
console.log(list.findMiddle().val);
console.log(list.findIndexFromEnd(1).val);
// console.log(list.remove('xianxian'), list.head)
// console.log(list.removeIndex(0), list.removeIndex(1), list.head);
// console.log(list.removeIndexFromEnd(1), list.head)
console.log(list.print());
console.log(list.reverseList());
console.log(list.checkCircle());
console.log(list.isEmpty());
// console.log(list.clear());
