const axios = require('axios');

// 定义多个请求
const request1 = axios.get('http://localhost:3000/items/1');
const request2 = axios.get('http://localhost:3000/items/2');

axios
	.all([request1, request2])
	.then(
		axios.spread((response1, response2) => {
			// 处理每个请求的响应
			console.log('Response 1:', response1.data);
			console.log('Response 2:', response2.data);
		})
	)
	.catch(error => {
		// 处理错误
		console.error('Error:', error);
	});
