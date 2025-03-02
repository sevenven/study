// 使用 AbortController 可以取消 fetch 请求。
const controller = new AbortController();
const signal = controller.signal;

fetch('http://localhost:3000/items', { signal })
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error('Error:', error));

// 取消请求
controller.abort();
