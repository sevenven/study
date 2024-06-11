// 静态页面服务器

const Koa = require("koa");
const koaStatic = require("koa-static");

const app = new Koa();
app.use(koaStatic(__dirname + "/public"));
app.listen(8887, () => {
  console.log("visit: http://127.0.0.1:8887/");
});
