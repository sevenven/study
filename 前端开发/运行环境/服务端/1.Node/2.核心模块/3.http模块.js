const http = require('http'); // 引入 HTTP 模块

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
	// 处理 GET 请求
	if (req.method === 'GET') {
		switch (req.url) {
			case '/': // 根路径
				res.writeHead(200, { 'Content-Type': 'text/plain' }); // 设置响应头
				res.end('Home Page\n'); // 返回响应内容
				break;
			case '/about': // 关于页面
				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.end('About Page\n');
				break;
			default: // 其他路径
				res.writeHead(404, { 'Content-Type': 'text/plain' }); // 404 状态码
				res.end('Not Found\n');
				break;
		}
	}
	// 处理 POST 请求
	else if (req.method === 'POST' && req.url === '/submit') {
		let body = ''; // 用于存储请求体数据

		// 监听数据接收事件
		req.on('data', chunk => {
			body += chunk.toString(); // 将数据块转换为字符串并拼接到 body
		});

		// 监听数据接收完成事件
		req.on('end', () => {
			try {
				const postData = JSON.parse(body); // 解析请求体为 JSON 对象
				console.log(postData); // 打印接收到的数据

				// 返回成功响应
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: 'Data received', receivedData: postData }));
			} catch (err) {
				console.error(err); // 打印错误信息
				res.writeHead(400, { 'Content-Type': 'text/plain' }); // 400 状态码
				res.end('Bad Request\n');
			}
		});
	}
	// 处理其他 HTTP 方法
	else {
		res.writeHead(405, { 'Content-Type': 'text/plain' }); // 405 状态码
		res.end('Method Not Allowed\n');
	}
});

// 处理客户端错误
server.on('clientError', (err, socket) => {
	console.error(err); // 打印错误信息
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n'); // 返回 400 错误响应
});

// 启动服务器，监听 3000 端口
server.listen(3000, '127.0.0.1', () => {
	console.log('Server running at http://127.0.0.1:3000/');
});
