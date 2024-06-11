// 39_src_两个新的生命周期钩子
// 引入Vue
import Vue from "vue";
// 引入App
import App from "./App.vue";
// 引入路由器
import router from "./router";

// 关闭Vue的生产提示
Vue.config.productionTip = false;

// 创建vm
new Vue({
  el: "#app",
  render: (h) => h(App),
  router: router,
});
