// 该文件专门用于创建整个应用的路由器
import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件
import Home from "../pages/Home/index.vue";
import Message from "../pages/Home/Message";
import Detail from "../pages/Home/Message/Detail";
import News from "../pages/Home/News";
// 路由懒加载
const About = () => import("../pages/About/index.vue");

// 应用插件
Vue.use(VueRouter);

// 应用插件
Vue.use(VueRouter);

// 创建并暴露一个路由器
export default new VueRouter({
  // 路由
  routes: [
    {
      // 一级路由需要加[/]
      path: "/home",
      component: Home,
      children: [
        // 嵌套路由
        {
          // 二级及以下路由不需要加[/]
          path: "message",
          component: Message,
          children: [
            {
              // 命名路由
              name: "detail",
              path: "detail",
              // 声明路由的param参数
              // path: "detail/:id/:title",
              component: Detail,

              /* // props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件。
              props: { a: 1, b: "hello" }, */

              /* // props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给组件。
              props: true, */

              // props的第三种写法，值为函数
              // props($route) {
              //   return {
              //     id: $route.query.id,
              //     title: $route.query.title,
              //     a: 1,
              //     b: "hello",
              //   };
              // },
            },
          ],
        },
        {
          path: "news",
          component: News,
        },
      ],
    },
    {
      name: "guanyu",
      path: "/about",
      component: About,
    },
  ],
});
