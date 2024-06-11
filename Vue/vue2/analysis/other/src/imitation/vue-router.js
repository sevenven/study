let Vue;
// 一个简易的vue-router实现
class VueRouter {
  constructor(options) {
    this.$options = options;
    this.current = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, "matched", []);
  }
  // 初始化
  init() {
    // 递归遍历路由 获得匹配的组件数组
    this.match(this.$options.routes);
    // 监听事件
    this.bindEvents();
    // 声明组件
    this.initComponent();
  }

  // 递归遍历路由 获得匹配this.current的组件数组
  match(routes) {
    for (const route of routes) {
      if (route.path === "/" && this.current === "/") {
        return this.matched.push(route);
      } else if (route.path !== "/" && this.current.indexOf(route.path) > -1) {
        this.matched.push(route);
        route.children && this.match(route.children);
      }
    }
  }

  // 监听事件
  bindEvents() {
    window.addEventListener("hashchange", this.onHashChange.bind(this), false);
  }
  // hashchange响应函数
  onHashChange() {
    this.current = window.location.hash.slice(1) || "/";
    this.matched = [];
    this.match(this.$options.routes);
  }
  // 声明组件
  initComponent() {
    // router-link组件
    Vue.component("router-link", {
      props: {
        to: {
          type: String,
          require: true,
        },
      },
      render(h) {
        // vue-cli环境下有jsx配置---当前是vue-cli4创建的项目
        // return <a href={'#' + this.to}>{this.$slots.default}</a>
        return h(
          "a",
          {
            attrs: { href: "#" + this.to },
          },
          [this.$slots.default]
        );
      },
    });
    // router-view组件
    Vue.component("router-view", {
      render(h) {
        // 核心：根据URL的hash部分动态匹配要渲染的组件
        this.$vnode.data.routerView = true; // 标记当前组件是router-view组件
        let depth = 0;
        let parent = this.$parent;
        while (parent) {
          if (parent.$vnode?.data?.routerView) depth++; // 计算当前router-view组件深度
          parent = parent.$parent;
        }
        let curRoute = this.$router.matched[depth]; // 从match数组中找到对应深度的组件渲染
        const component = curRoute?.component || null;
        return h(component);
      },
    });
  }
}

// _Vue: Vue的构造函数
// Vue.use()的时候会调用插件的install()
VueRouter.install = function (_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      // 只需要在根实例时执行一次
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    },
  });
};

export default VueRouter;
