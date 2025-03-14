let Vue;

// 一个简易的Store
class Store {
  constructor(options) {
    // 持有state并使其响应化
    this.state = new Vue({ data: () => options.state });
    this.actions = options.actions;
    this.mutations = options.mutations;
    // 处理getters
    options.getters && this.handleGetters(options.getters);
    // 防止this丢失
    this.dispatch = this.dispatch.bind(this);
    this.commit = this.commit.bind(this);
  }

  // 更新state的函数
  commit(type, payload) {
    this.mutations[type](this.state, payload);
  }

  // 派发action的函数
  dispatch(type, payload) {
    return this.actions[type](this, payload);
  }

  // 在this.getters上代理getters
  handleGetters(getters) {
    this.getters = {};
    Object.keys(getters).forEach((key) => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state);
        },
      });
    });
  }
}

function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) Vue.prototype.$store = this.$options.store;
    },
  });
}

export default {
  Store,
  install,
};
