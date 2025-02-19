fetch('http://localhost:3000/items/3')
	.then(response => {
		// response.ok: 布尔值，表示请求是否成功（状态码 200-299）。
		// response.status: HTTP 状态码。
		// response.statusText: 状态文本（如 "OK"）。
		// response.headers: 响应头对象。
		// response.json(): 将响应体解析为 JSON。
		// response.text(): 将响应体解析为文本。
		// response.blob(): 将响应体解析为 Blob 对象（用于二进制数据）。

		if (!response.ok) throw new Error('Network response was not ok');
		return response.json();
	})
	.then(data => console.log(data))
	.catch(error => console.error('Error:', error));
