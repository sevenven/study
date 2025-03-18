import './public-path';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

let root: ReactDOM.Root | null = null;

function render(props: any) {
	const { container } = props;
	const rootElement = container ? container.querySelector('#root') : document.getElementById('root');

	root = ReactDOM.createRoot(rootElement as HTMLElement);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
	render({});
}

export async function bootstrap() {
	console.log('子应用启动');
}

export async function mount(props: any) {
	console.log('子应用挂载');
	render(props);
}

export async function unmount(props: any) {
	if (root) {
		root.unmount();
	}
}
