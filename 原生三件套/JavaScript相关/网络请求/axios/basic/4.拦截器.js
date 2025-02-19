const axios = require('axios');

// 请求拦截器
axios.interceptors.request.use(
	config => {
		console.log('Request Interceptor:', config);
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// 响应拦截器
axios.interceptors.response.use(
	response => {
		console.log('Response Interceptor:', response);
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);

axios
	.get('http://localhost:3000/items')
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		// 处理错误
		console.error('Error:', error);
	});
