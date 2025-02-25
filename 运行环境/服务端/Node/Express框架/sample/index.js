const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let items = []; // 使用数组模拟数据库

// 获取所有items
app.get('/items', (req, res) => {
	res.json(items);
});

// 根据ID获取特定item
app.get('/items/:id', (req, res) => {
	const item = items.find(i => i.id === parseInt(req.params.id));
	if (!item) return res.status(404).send('找不到该资源');
	res.json(item);
});

// 添加新item
app.post('/items', (req, res) => {
	const newItem = { id: Date.now(), name: req.body.name };
	items.push(newItem);
	res.status(201).json(newItem);
});

// 更新item
app.put('/items/:id', (req, res) => {
	const item = items.find(i => i.id === parseInt(req.params.id));
	if (!item) return res.status(404).send('找不到该资源');

	item.name = req.body.name;
	res.json(item);
});

// 删除item
app.delete('/items/:id', (req, res) => {
	const index = items.findIndex(i => i.id === parseInt(req.params.id));
	if (index === -1) return res.status(404).send('找不到该资源');

	items.splice(index, 1);
	res.status(204).send();
});

// 启动服务器
app.listen(port, () => {
	console.log(`服务正在监听 http://localhost:${port}`);
});
