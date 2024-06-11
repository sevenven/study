function Stack() {
  this.elements = [];
}

Stack.prototype.push = function (element) {
  this.elements.push(element);
};

Stack.prototype.pop = function () {
  return this.elements.pop();
};

Stack.prototype.peek = function () {
  return this.elements[this.elements.length - 1];
};

Stack.prototype.isEmpty = function () {
  return this.elements.length === 0;
};

Stack.prototype.size = function () {
  return this.elements.length;
};

Stack.prototype.clear = function () {
  this.elements.length = 0;
};

var stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
console.log(stack);
console.log(stack.pop());
console.log(stack.top());
console.log(stack.size());
stack.clear();
console.log(stack.isEmpty());
