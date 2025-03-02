const axios = require('axios');

const CancelToken = axios.CancelToken;
let cancel;

axios
	.get('http://localhost:3000/items', {
		cancelToken: new CancelToken(function executor(c) {
			cancel = c;
		})
	})
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		if (axios.isCancel(error)) {
			console.log('Request canceled', error.message);
		} else {
			console.error(`${error.status}: ${error.data || error}`);
		}
	});

// 取消请求
cancel('Operation canceled by the user.');
