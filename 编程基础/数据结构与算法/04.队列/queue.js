function Queue() {
  this.elements = [];
}

// 入队
Queue.prototype.enqueue = function (element) {
  this.elements.push(element);
};

// 出队
Queue.prototype.dequeue = function () {
  return this.elements.shift();
};

// 访问队首元素
Queue.prototype.head = function () {
  return this.elements[0];
};

Queue.prototype.tail = function () {
  return this.elements[this.elements.length - 1];
};

Queue.prototype.size = function () {
  return this.elements.length;
};

Queue.prototype.clear = function () {
  this.elements.length = 0;
};

Queue.prototype.isEmpty = function () {
  return this.elements.length === 0;
};
