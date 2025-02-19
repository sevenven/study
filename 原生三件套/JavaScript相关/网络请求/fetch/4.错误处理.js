// fetch 只有在网络错误时才会 reject，HTTP 错误状态码（如 404、500）不会触发 reject。
// 因此，需要手动检查 response.ok 或 response.status。
fetch('http://localhost:3000/item')
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	})
	.then(data => console.log(data))
	.catch(error => console.error('Error:', error));
