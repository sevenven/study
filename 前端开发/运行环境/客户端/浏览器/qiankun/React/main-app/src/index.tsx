import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { registerMicroApps, start } from 'qiankun';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

registerMicroApps([
	{
		name: 'subApp',
		entry: '//localhost:3001',
		container: '#sub-app-container',
		activeRule: '/sub-app'
	}
]);

start();

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
