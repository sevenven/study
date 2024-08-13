import Header from './js/header';
import Sidebar from './js/sidebar';
import Content from './js/content';

import Avatar from './js/avatar';
import Counter from './js/counter';
import Number from './js/number';

import avatar from './img/avatar.jpeg';

import style from './index.css';
import icon from './css/iconfont.css';

new Header();
new Sidebar();
new Content();
new Avatar();

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar); // img.classList.add('avatar')
root.append(img);

var div = document.createElement('div');
div.classList.add(icon.iconfont);
div.classList.add(icon['icon-fangwu']);

root.append(div);

var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

btn.onclick = function () {
	var div = document.createElement('div');
	div.innerHTML = 'item';
	// css热更新不需要特别的写法
	div.classList.add(style.item);
	document.body.appendChild(div);
};

new Counter();
// JS热更新写法
new Number();
if (module.hot) {
	module.hot.accept('./js/number', () => {
		document.body.removeChild(document.getElementById('number'));
		// 热更新Number模块
		// 可以更改number的代码测试热更新
		new Number();
	});
}

// 测试ES6语法
const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map(item => {
	console.log(item);
});
