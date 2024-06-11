class SingleObject {
  login() {
    console.log("login...");
  }
}
SingleObject.getInstance = (() => {
  let instance;
  return () => {
    if (!instance) instance = new SingleObject();
    return instance;
  };
})();

// 测试
let obj1 = SingleObject.getInstance();
obj1.login();
let obj2 = SingleObject.getInstance();
obj2.login();
console.log(obj1 === obj2);
