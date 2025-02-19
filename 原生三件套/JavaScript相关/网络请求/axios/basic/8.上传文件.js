const axios = require('axios');
const FormData = require('form-data');

const form = new FormData();
form.append('file', fs.createReadStream('path/to/file'));

axios
	.post('https://example.com/upload', form, {
		headers: form.getHeaders()
	})
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.log('Error', error.message);
	});
