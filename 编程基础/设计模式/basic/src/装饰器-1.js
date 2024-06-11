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
class MyClass {}

let obj = new MyClass();
obj.foo(); // 'foo'
