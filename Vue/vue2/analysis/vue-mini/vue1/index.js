// 实现一个简单的MVVM框架 1.数据代理 2.双向数据绑定 3.模板编译
function MVVM(options) {
  this.$options = options;
  this.$data = options.data;

  // 在vm上代理data属性
  Object.keys(this.$data).forEach((key) => {
    this._proxyData(key);
  });

  // 递归遍历data属性，拦截每一项进行响应式处理
  observe(this.$data);

  // 编译模板
  new Compile(options.el || document.body, this);
}

// 在vm上代理data属性
MVVM.prototype._proxyData = function (key) {
  Object.defineProperty(this, key, {
    enumerable: true,
    get() {
      return this.$data[key];
    },
    set(newVal) {
      this.$data[key] = newVal;
    },
  });
};
