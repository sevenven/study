// Fetch API 是现代浏览器提供的一个用于发起网络请求的接口，用于替代传统的 XMLHttpRequest。
// 它基于 Promise，提供了更简洁、强大的功能来处理 HTTP 请求。

fetch('http://localhost:3000/items') // 发起一个 GET 请求到指定的 URL。
	.then(response => {
		return response.json();
	}) // 将响应解析为 JSON 格式。
	.then(data => console.log(data)) // 处理解析后的数据。
	.catch(error => console.error('Error:', error)); // 捕获并处理错误。
