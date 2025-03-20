import { createApp } from 'vue';
import App from './App.vue';
import { registerMicroApps, start } from 'qiankun';
import { createRouter, createWebHistory } from 'vue-router';

const app = createApp(App);

const router = createRouter({
	history: createWebHistory(),
	routes: []
});

app.use(router);

registerMicroApps([
	{
		name: 'sub-app',
		entry: '//localhost:8081',
		container: '#sub-app-container',
		activeRule: '/sub-app'
	}
]);

start();

app.mount('#app');
