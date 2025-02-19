fetch('http://localhost:3000/items', {
	method: 'POST', // 请求方法
	// 请求头，通常用于设置 Content-Type 等
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ id: 3, name: 'Item 3' }) // 请求体，通常用于 POST 或 PUT 请求。
})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error('Error:', error));
