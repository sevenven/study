// 该文件专门用于创建整个应用的路由器
import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件
import About from "../components/About";
import Home from "../components/Home";

// 应用插件
Vue.use(VueRouter);

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: "/about",
      component: About,
    },
    {
      path: "/home",
      component: Home,
    },
  ],
});
