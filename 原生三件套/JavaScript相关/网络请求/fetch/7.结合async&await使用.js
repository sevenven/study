// fetch 可以与 async/await 结合使用，使代码更简洁。
async function fetchData() {
	try {
		const response = await fetch('http://localhost:3000/items');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error:', error);
	}
}

fetchData();
