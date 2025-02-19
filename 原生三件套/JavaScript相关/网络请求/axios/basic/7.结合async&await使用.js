const axios = require('axios');

async function fetchData() {
	try {
		const response = await axios.get('http://localhost:3000/items');
		console.log(response.data);
	} catch (error) {
		console.log('Error', error.message);
	}
}

fetchData();
