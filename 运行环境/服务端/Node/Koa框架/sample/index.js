const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors'); // 引入 @koa/cors 中间件
const { koaBody } = require('koa-body');

const app = new Koa();
const router = new Router();

// 使用 @koa/cors 中间件，允许跨域请求
app.use(cors());

// 模拟数据存储
let items = [
	{ id: 1, name: 'Item 1' },
	{ id: 2, name: 'Item 2' }
];

// GET 方法：获取所有 items
router.get('/items', ctx => {
	ctx.body = items;
});

// GET 方法：获取单个 item
router.get('/items/:id', ctx => {
	const id = parseInt(ctx.params.id);
	const item = items.find(i => i.id === id);
	if (item) {
		ctx.body = item;
	} else {
		ctx.status = 404;
		ctx.body = { message: 'Item not found' };
	}
});

// POST 方法：创建新 item
router.post('/items', ctx => {
	const newItem = ctx.request.body;
	if (!newItem.id || !newItem.name) {
		ctx.status = 400;
		ctx.body = { message: 'Invalid input' };
	} else {
		items.push(newItem);
		ctx.status = 200;
		ctx.body = newItem;
	}
});

// PUT 方法：更新 item
router.put('/items/:id', ctx => {
	const id = parseInt(ctx.params.id);
	const updatedItem = ctx.request.body;
	const index = items.findIndex(i => i.id === id);
	if (index !== -1) {
		items[index] = { ...items[index], ...updatedItem };
		ctx.status = 200;
		ctx.body = items[index];
	} else {
		ctx.status = 404;
		ctx.body = { message: 'Item not found' };
	}
});

// DELETE 方法：删除 item
router.delete('/items/:id', ctx => {
	const id = parseInt(ctx.params.id);
	const index = items.findIndex(i => i.id === id);
	if (index !== -1) {
		items.splice(index, 1);
		ctx.status = 200;
		ctx.body = {
			result: 'OK'
		};
	} else {
		ctx.status = 404;
		ctx.body = { message: 'Item not found' };
	}
});

// 使用 koa-body 解析请求体
app.use(koaBody());

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
