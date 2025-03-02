const arrayProto = Object.create(Array.prototype);
["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
  (method) => {
    arrayProto[method] = function (...args) {
      Array.prototype[method].apply(this, args);
    };
  }
);

// data代理入口
function observe(data) {
  if (!data || typeof data !== "object") return;
  new Observer(data);
}

function Observer(data) {
  if (Array.isArray(data)) {
    data.__proto__ = arrayProto;
    data.forEach((val) => observe(val));
  } else {
    // 遍历代理data
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
}

// 代理data的每一项，实现数据响应式监听
Observer.prototype.defineReactive = function (data, key, val) {
  observe(val); // 间接递归
  // 1-响应式key : 1-dep实例
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    get() {
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        observe(newVal); // 间接递归
        dep.notify();
      }
    },
  });
};

// dep实例与data的key一一对应
function Dep() {
  this.subs = []; // 持有watcher实例 负责通知watcher实例更新界面 1-dep : n-watcher
}

// 临时存放正在创建的Watcher实例
Dep.target = null;

// 依赖收集
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};

// 派发更新
Dep.prototype.notify = function () {
  this.subs.forEach((sub) => sub.update());
};
