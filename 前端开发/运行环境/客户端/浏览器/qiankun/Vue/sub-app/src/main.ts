import { createApp } from 'vue';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import type { QiankunProps } from 'vite-plugin-qiankun/dist/helper';
import App from './App.vue';
import './public-path';

let app: ReturnType<typeof createApp> | null = null;

function render(props: QiankunProps = {}) {
	const { container } = props;
	const mountElement = container ? container.querySelector('#app') : document.querySelector('#app');

	if (!mountElement) {
		throw new Error('#app element not found');
	}

	app = createApp(App);
	app.mount(mountElement);
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
	render();
}

renderWithQiankun({
	mount(props) {
		render(props);
	},
	bootstrap() {
		console.log('bootstrap');
	},
	unmount() {
		app?.unmount();
	},
	update(props) {
		console.log('update props', props);
	}
});
