// 引入 css
import './style/style1.css';
import './style/style2.less';

import { sum } from './math';
import moment from 'moment';
import 'moment/locale/zh-cn';
console.log('local', moment.local());
console.log('data', moment().format('ll'));

const sumRes = sum(10, 20);
console.log('sumRes', sumRes);

// // 增加，开启热更新之后的代码逻辑
// if (module.hot) {
//     module.hot.accept(['./math'], () => {
//         const sumRes = sum(10, 30)
//         console.log('sumRes in hot', sumRes)
//     })
// }

setTimeout(() => {
	import('./dynamic-data.js').then(res => {
		console.log(res.default.message);
	});
});
