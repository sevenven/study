// 一个表达式对应一个Watcher实例
// 负责具体节点更新
function Watcher(vm, exp, updater) {
  this.vm = vm;
  this.exp = exp;
  this.updater = updater; // 持有updater
  this.val = this.get();
}

// 获取当前表达式对应的值
Watcher.prototype.get = function () {
  // 触发依赖收集
  Dep.target = this;
  const val = getVMVal(this.vm, this.exp);
  Dep.target = null;
  return val;
};

// Dep中调用
// data项发生变化时更新对应的界面
// 目前这种写法是不支持动态添加依赖的
Watcher.prototype.update = function () {
  const newVal = getVMVal(this.vm, this.exp);
  if (newVal !== this.val) {
    this.updater(newVal);
    this.val = newVal;
  }
};
