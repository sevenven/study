// 引入 css
import './style/style1.css';
import './style/style2.less';

import { sum } from './js/math.js';
import moment from 'moment';
import 'moment/locale/zh-cn';
console.log('local', moment.locale());
console.log('data', moment().format('ll'));

const sumRes = sum(10, 20);
console.log('sumRes', sumRes);

setTimeout(() => {
	import(/* webpackChunkName: "dynamicData" */ './js/dynamic-data.js').then(res => {
		console.log(res.default.message);
	});
});
