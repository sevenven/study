// webpack中实现代码分割，两种方式
// 1. 同步代码： 只需要在webpack中做optimization的配置即可
// 2. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中

// 同步引入
// import _ from 'loadsh';
// import { add } from './math.js';

// console.log(_.join(['a', 'b', 'c']));
// add(1, 7);

// 异步引入
async function getComponent() {
	// const { default: _ } = await import('lodash');
	// webpackPrefetch  --告诉浏览器在空闲时才开始加载资源；
	// webpackPreload --告诉浏览器立即加载资源;
	const { default: _ } = await import(/* webpackChunkName:"lodash" */ /* webpackPrefetch: true */ 'lodash');
	const element = document.createElement('div');
	element.innerHTML = _.join(['Dell', 'Lee'], '-');
	return element;
}

document.addEventListener('click', () => {
	getComponent().then(element => {
		document.body.appendChild(element);
	});
});
