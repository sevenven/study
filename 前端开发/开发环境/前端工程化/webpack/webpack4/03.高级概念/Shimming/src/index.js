import _ from 'loadsh';
import { bodyRed } from './other.js';
import { add } from './math.js';

console.log(_.join(['a', 'b', 'c']));
console.log(add(1, 7));

const dom = $('div');
dom.html(_.join(['seven', 'su'], '-'));
jQuery('body').append(dom);

bodyRed();
