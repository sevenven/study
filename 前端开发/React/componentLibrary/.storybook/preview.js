import React from 'react';
import { addDecorator } from '@storybook/react';
import '../src/styles/main.less';

export const parameters = {
	actions: {
		// 定义自动匹配事件处理函数的正则表达式
		// 匹配以 "on" 开头且首字母大写的属性（如 onClick、onChange）
		argTypesRegex: '^on[A-Z].*'
	},
	controls: {
		matchers: {
			// 当属性名包含 "background" 或 "color" 时（不区分大小写）
			// 自动生成颜色选择器控件
			color: /(background|color)$/i,
			// 当属性名以 "Date" 结尾时
			// 自动生成日期选择器控件
			date: /Date$/
		}
	}
};

addDecorator(story => <>{story()}</>);
