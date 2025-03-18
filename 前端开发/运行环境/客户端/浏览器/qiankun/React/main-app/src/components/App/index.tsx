import React from 'react';
import { loadMicroApp } from 'qiankun';
import './index.css';

function App() {
	React.useEffect(() => {
		loadMicroApp({
			name: 'subApp',
			entry: '//localhost:3001',
			container: '#sub-app-container'
		});
	}, []);

	return (
		<div className="App">
			<h1>主应用</h1>
			<div id="sub-app-container"></div>
		</div>
	);
}

export default App;
