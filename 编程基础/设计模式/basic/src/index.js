function readonly(target, name, descriptor) {
  // descriptor对象原来的值如下
  // { value: specifiedFunction, enumerable: false, configurable: true, writable: true }
  descriptor.writable = false;
  return descriptor;
}

function mixins(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list);
  };
}

const Foo = {
  foo() {
    alert("foo");
  },
};

// 装饰类
@mixins(Foo)
class Person {
  constructor() {
    this.first = "A";
    this.last = "B";
  }

  // 装饰方法
  @readonly
  name() {
    return `${this.first} ${this.last}`;
  }
}

var p = new Person();
p.foo();
console.log(p.name());
p.name = function() {}; // 这里会报错，因为 name 是只读属性
