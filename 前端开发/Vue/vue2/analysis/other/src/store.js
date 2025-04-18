import Vue from "vue";
// import Vuex from "vuex";
import Vuex from "./imitation/vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 状态、数据
  state: { count: 0 },
  getters: {
    left(state) {
      // 计算剩余数量
      return 10 - state.count;
    },
  },
  // 更改状态的函数
  mutations: {
    increment(state) {
      state.count += 1;
    },
  },
  // 异步操作
  actions: {
    asyncIncrement({ commit, getters }) {
      // 异步逻辑返回Promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 添加业务逻辑
          if (getters.left > 0) {
            commit("increment");
            resolve();
            return;
          }
          reject();
        }, 1000);
      });
    },
  },
});
