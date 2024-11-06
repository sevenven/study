// https://leetcode.cn/problems/copy-list-with-random-pointer/
// 给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。
// 构造这个链表的 深拷贝。 深拷贝应该正好由 n 个 全新 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。复制链表中的指针都不应指向原链表中的节点 。

// function Node(val, next) {
//   this.val = val;
//   this.next = next || null;
//   this.random = random || null;
// }
// _随机链表的复制

/**
 * @param {Node} head
 * @return {Node}
 */
// 递归+哈希表
var copyRandomList = function (head, cached = new Map()) {
	if (!head) return null;
	if (!cached.has(head)) {
		cached.set(head, { val: head.val });
		Object.assign(cached.get(head), {
			next: copyRandomList(head.next, cached),
			random: copyRandomList(head.random, cached)
		});
	}
	return cached.get(head);
};

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
	if (!head) return null;
	for (let cur = head; cur; cur = cur.next.next) cur.next = new Node(cur.val, cur.next, null);
	for (let cur = head; cur; cur = cur.next.next) cur.next.random = cur.random?.next || null;
	let _head = head.next,
		cur = head,
		_new;
	while (cur) {
		_new = cur.next;
		[cur.next, cur, _new.next] = [_new.next, _new.next, _new.next?.next || null];
	}
	return _head;
};
