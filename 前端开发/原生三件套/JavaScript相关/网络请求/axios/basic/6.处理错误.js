const axios = require('axios');

axios
	.get('http://localhost:3000/404')
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.log('Error', error.message);
	});
